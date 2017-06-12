import React, { Component } from 'react';
import { Media, Image, Button } from 'react-bootstrap';
import FlipMove from 'react-flip-move';
import moment from 'moment';

import helpers from '../utils/helpers'; 

//client side socket connection
import io from 'socket.io-client'; 
const socket = io(); 

export default class ResultsListItems extends Component {

	constructor(props){
		super(props);
		this.state = {
			articles: []
		}
	}

	componentWillMount() {
		this.setState({articles: [...this.props.articles]})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({articles: [...nextProps.articles]});
	}

	toggleSave(article, imgSrc, index){
		
		helpers.saveArticle({title: article.headline.main, url: article.web_url, imgsrc: imgSrc, pubdate: article.pub_date, snippet: article.snippet})
		.then(response=> {
			//good place to emit new saved article message
			socket.emit('save-event', {article: response.data});
			//copy articles to new array to change array then update state
			let revisedArticles = this.state.articles.slice();
			//add property to this article to notify user that the article was saved
			revisedArticles[index]['saved'] = true;
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

	render() {

		if(this.state.articles.length > 0 ) {
			return (			
				<Media.List>
					<FlipMove duration={1500} easing='ease-in-out' maintainContainerHeight={true}>
					
						{this.state.articles.map((article, index)=> {
								
								const multimedia = article.multimedia;
								const srcIndex = multimedia.findIndex(e => e.subtype==='thumbnail');
								let imgSrc = srcIndex === -1 ?  'https://placehold.it/75x75?text=No+Image' : `https://www.nytimes.com/${multimedia[srcIndex].url}`;
								
								let saved = <i className="fa fa-bookmark" aria-hidden="true"></i>;
								if(article.hasOwnProperty('saved')) {
									saved = article.saved ? 'Saved' : <i className="fa fa-bookmark" aria-hidden="true"></i>;
								}

								return (
									<Media.ListItem key={index}>
										<Media.Left>
											<a href={article.web_url} target="_blank">
												<Image src={imgSrc} alt={`Image for ${article.headline.main}`} height={75} width={75}/>
											</a>
										</Media.Left>
										<Media.Body>
											<Media.Heading>
												<a href={article.web_url} target='_blank'>{article.headline.main}</a>
											</Media.Heading>
											<p>{article.snippet}</p>
											<p>{moment(article.pub_date).format('LLLL')}</p>
										</Media.Body>
										<Media.Right>

											<Button bsStyle='primary' onClick={function() {this.toggleSave(article, imgSrc, index)}.bind(this)}>
												{saved}
											</Button>
	
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
						<p><em>Please search for another term for better results.</em></p>
					</Media.Body>
				</Media>
			)
		}
	}
}