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
		this.handleClick = this.handleClick.bind(this);
		this.sortArticles = this.sortArticles.bind(this);
		
		socket.on('new-delete', () => {
			console.log("delete event registered");
			this.refreshSavedArticles()
		});

		this.refreshSavedArticles = this.refreshSavedArticles.bind(this);
	}

	refreshSavedArticles() {
		helpers.getSavedArticles()
    .then(response => {
    	this.setState({articles: [...response]})
    }).catch(err=>{
			if(err) {
				console.error(err);
				//this is a great place to show an error on screen
			}
		});
	}

	componentWillMount() {
		const sortedArticles = this.props.articles.slice()
		sortedArticles.sort(this.sortArticles);
		this.setState({articles: [...sortedArticles]})
	}

	componentWillReceiveProps(nextProps) {
		const sortedArticles = nextProps.articles.slice()
		sortedArticles.sort(this.sortArticles);
		this.setState({articles: [...sortedArticles]})
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

	sortArticles(a, b) {
		return a.likes < b.likes;
	}

	handleClick(e){
		const _id = e.target.attributes.name.value;
		const count = e.target.attributes.value.value;
		helpers.incrementVotes(_id, count)
		.then(response => {
			//copy state to update attribute of one element
			let revisedArticles = this.state.articles.slice();
			//update likes on returned object
			revisedArticles[revisedArticles.findIndex(e=> e._id === _id)].likes = response.doc.likes;

			revisedArticles.sort(this.sortArticles);
			//set new state
			this.setState({articles: [...revisedArticles]});
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
									deleted = deleted ? 'Deleted' : <i className="fa fa-times" aria-hidden="true"></i>;
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
												
													<Button  bsStyle='default' bsSize='xsmall' onClick={this.handleClick}>
														<i className="fa fa-chevron-up" value={1} name={article._id}></i>
													</Button>

													<Badge className='button-list__button--middle'>{article.likes}</Badge>

													<Button bsStyle='default' bsSize='xsmall' onClick={this.handleClick}>
															<i className="fa fa-chevron-down" value={-1} name={article._id}></i>
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