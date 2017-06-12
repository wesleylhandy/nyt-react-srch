import React, { Component } from 'react';
import { Media, Image, Button, Badge } from 'react-bootstrap';
import FlipMove from 'react-flip-move';
import moment from 'moment';

import helpers from '../utils/helpers';
import '../styles/fav-list-item-buttons.css' 

//client side socket connection
import io from 'socket.io-client'; 
const socket = io(); 

export default class FavoritesListItems extends Component {

	constructor(props){
		super(props);
		this.state = {
			articles: []
		}
		
		socket.on('new-delete', () => this.refreshSavedArticles());

		socket.on('new-vote', () => this.refreshSavedArticles());

		this.refreshSavedArticles = this.refreshSavedArticles.bind(this);
		this.sortArticles = this.sortArticles.bind(this);
	}

	refreshSavedArticles() {
		helpers.getSavedArticles()
    .then(response => {
    	this.setState({articles: [...this.sortArticles(response)]})
    }).catch(err=>{
			if(err) {
				console.error(err);
				//this is a great place to show an error on screen
			}
		});
	}

	componentWillMount() {
		this.setState({articles: [...this.sortArticles(this.props.articles)]})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({articles: [...this.sortArticles(nextProps.articles)]})
	}

	toggleDelete(_id, index) {
		
		helpers.removeArticle(_id)
		.then(response=> {
			socket.emit('remove-event', {deleted: true})
			//copy articles to new array to change array then update state
			let revisedArticles = this.state.articles.slice();
			//add property to this article to notify user that the article was saved
			revisedArticles[index]['deleted'] = true;

			this.setState({articles: [...revisedArticles]});
			
			revisedArticles.splice(index, 1);
			setTimeout(()=>this.setState({articles: [...revisedArticles]}), 1000);

		}).catch(err=>{
			if(err) {
				console.error(err);
				//this is a great place to show an error on screen
			}
		});
	}

	sortArticles(articles) {
		return articles.sort((a, b)=> a.likes < b.likes ? 1 : -1);
	}

	handleClick(count, _id){
		// const _id = e.target.parentNode.attributes.name.value;
		// const count = e.target.parentNode.attributes.value.value;
		helpers.incrementVotes(_id, count)
		.then(response => {
			socket.emit('vote-event', {_id, count});
			//copy state to update attribute of one element
			let revisedArticles = this.state.articles.slice();
			//update likes on returned object
			revisedArticles[revisedArticles.findIndex(e=> e._id === _id)].likes = response.doc.likes;
			//set new state
			this.setState({articles: [...this.sortArticles(revisedArticles)]});
		}).catch(err=>{
			if(err) {
				console.error(err);
				//this is a great place to show an error on screen
			}
		});
	}

	render() {
		if(this.state.articles.length > 0 ) {
			return (
				<Media.List>			
					<FlipMove duration={1500} easing='ease-in-out' maintainContainerHeight={true}>
						{this.state.articles.map((article, index) => {
								
								let deleted = <i className="fa fa-times" aria-hidden="true"></i>;
								if(article.hasOwnProperty('deleted')) {
									deleted = article.deleted ? 'Deleted' : <i className="fa fa-times" aria-hidden="true"></i>;
								}

								return (
									<Media.ListItem key={index}>
										<Media.Left>
											<a href={article.url} target="_blank">
												<Image src={article.imgsrc} alt={`Image for ${article.title}`} height={75} width={75}/>
											</a>
										</Media.Left>
										<Media.Body>
											<Media.Heading>
												<a href={article.url} target='_blank'>{article.title}</a>
											</Media.Heading>
											<p>{article.snippet}</p>
											<p>{moment(article.pubdate).format('LLLL')}</p>
										</Media.Body>
										<Media.Right>
											<div className='button-list'>

												<div className='button-list--left'>											
												
													<Button  bsStyle='default' bsSize='xsmall' onClick={function() {this.handleClick(1, article._id)}.bind(this)}>
														<i className="fa fa-chevron-up"></i>
													</Button>

													<Badge className='button-list__button--middle'>{article.likes}</Badge>

													<Button bsStyle='default' bsSize='xsmall' onClick={function() {this.handleClick(-1, article._id)}.bind(this)}>
															<i className="fa fa-chevron-down"></i>
													</Button>
												</div>

												<div className='button-list--right'>

													<Button bsStyle='primary' onClick={function() {this.toggleDelete(article._id, index)}.bind(this)}>
															{deleted}
													</Button>
												</div>

											</div>
	
										</Media.Right>
										<hr/>
									</Media.ListItem>
								)
							})
						}
					</FlipMove>
				</Media.List>
				
			);

		} else {

			return (
				<Media>
					<Media.Body>
						<p><em>Please add an article to the Saved Articles list by first completing a search then clicking on the bookmark icon.</em></p>
					</Media.Body>
				</Media>
			)
		}
	}
}