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
		this.incrementVotes = this.incrementVotes.bind(this);
	}

	componentWillMount() {
		this.setState({articles: [...this.props.articles]})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({articles: [...nextProps.articles]});
	}

	toggleDelete(_id, index){
		
		helpers.removeArticle({_id})
		.then(response=> {
			//good place to emit new saved article message
			socket.emit('delete-event', {article: response.data});
			//copy articles to new array to change array then update state
			let revisedArticles = this.state.articles.slice();
			//add property to this article to notify user that the article was saved
			revisedArticles[index]['deleted'] = true;
			this.setState({articles: [...revisedArticles]});
			//add a delay before deleting article from results
			setTimeout(()=>{
				revisedArticles.splice(index, 1);
				this.setState({articles: [...revisedArticles]})
			}, 1000); 
		}).catch(err=>{
			if(err) {
				console.error(err);
				//this is a great place to show an error on screen
			}
		});
	}

	incrementVotes(_id, count){
		helpers.incrementVotes({_id, count})
		.then(response => {
			console.log(response.data);
		}).catch(err=>{
			if(err) {
				console.error(err);
				//this is a great place to show an error on screen
			}
		});
	}

	upVote(_id) {
		this.incrementVotes(_id, 1);
	}

	downVote(_id) {
		this.incrementVotes(_id, -1);
	}

	render() {
		if(this.state.articles.length > 0 ) {
			return (			
				<FlipMove duration={750} easing='ease-out' maintainContainerHeight={true}>
					<Media.List>
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
												
													<Button  bsStyle='default' bsSize='xsmall' onClick={()=>this.upVote(article._id).bind(this)}>
														<i className="fa fa-chevron-up"></i>
													</Button>

													<Badge className='button-list__button--middle'>{article.likes}</Badge>

													<Button bsStyle='default' bsSize='xsmall' onClick={()=>this.downVote(article._id).bind(this)}>
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
					</Media.List>
				</FlipMove>
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