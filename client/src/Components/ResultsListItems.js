import React, { Component } from 'react';
import { Image, Media, Button } from 'react-bootstrap';
import FlipMove from 'react-flip-move';
import moment from 'moment';

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

	toggleSave(article, imgSrc, i){
		console.log('save button clicked');
		const articleString = JSON.stringify({title: article.headline.main, url: article.web_url, imgsrc: imgSrc, pubdate: article.pub_date, snippet: article.snippet});
		
		fetch("http://localhost:3001/api/article", {method: 'POST', mode: 'no-cors', body: articleString})
		.then(response=>{
			console.log('save article response received');
			//handle errors first
			console.log(response);
			if(!response.ok) {
				throw Error(response.statusText);
			} 
			else return response.json();
		}).then(article=> {
			//copy articles to new array to change array then update state
			let revisedArticles = this.state.articles.slice();
			//add property to this article to notify user that the article was saved
			revisedArticles[i]['saved'] = true;
			this.setState({articles: [...revisedArticles]});
			//add a delay before deleting article from results
			setTimeout(()=>{
				revisedArticles.splice(i, 1);
				this.setState({articles: [...revisedArticles]})
			}, 1000); 
		}).catch(err=>{if(err)console.error(err)});
	}

	render() {

		if(this.state.articles.length > 0 ) {
			return (			
				<FlipMove duration={500} easing='ease-in' maintainContainerHeight={true}>
					<Media.List>
						{this.state.articles.map((article, i)=> {
								const multimedia = article.multimedia;
								const index = multimedia.findIndex(e => e.subtype==='thumbnail');
								let imgSrc;
								let saved = <i className="fa fa-bookmark" aria-hidden="true"></i>;
								if(article.hasOwnProperty('saved')) {
									saved = saved ? 'Saved' : <i className="fa fa-bookmark" aria-hidden="true"></i>;
								}
								if (index === -1) {
									imgSrc = 'https://placehold.it/75x75?text=No+Image';
								} else {
									imgSrc = `https://www.nytimes.com/${multimedia[index].url}`;
								}
								return (
									<Media.ListItem key={i}>
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

											<Button bsStyle='primary' onClick={function() {this.toggleSave(article, imgSrc, i)}.bind(this)}>
												{saved}
											</Button>
	
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
						<p><em>Please search for another term for better results.</em></p>
					</Media.Body>
				</Media>
			)
		}
	}
}