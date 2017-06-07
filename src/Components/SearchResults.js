import React, { Component } from 'react';
import { Collapse, Image, Media } from 'react-bootstrap';
import { FlipMove } from 'react-flip-move';
import { moment } from 'moment';

import PanelHeading from './PanelHeading';

export default class SearchResults extends Component {

	constructor(props) {
		super(props);
		this.state={
			open: false
		}
	}

	componentWillReceiveProps(nextProps) {
    this.setState({open: nextProps.open});
  }

  toggleExpand() {
		this.setState({open: !this.state.open});
	}

	renderResultsList() {

		if(this.props.articles.length > 0) {
			return (
			<FlipMove duration={250} easing='ease-in' maintainContainerHeight={true}>
				<Media.List>
					{()=> {
						return this.props.articles.map((article, i)=> {
							const multimedia = article.multimedia;
							const index = multimedia.findIndex(e => e.subtype==='thumbnail');
							let imgSrc;
							if (index === -1) {
								imgSrc = 'https://placehold.it/75x75?text=No+Image';
							} else {
								imgSrc = `https://www.nytimes.com/${multimedia[index].url}`;
							}
							return (
								<Media.ListItem key={i}>
									<Media.Left>
										<a href={article.web_url} target="_blank">
											<Image src={imgSrc} alt={`Image for ${article.headline.main}`} height='75' width='75'/>
										</a>
									</Media.Left>
									<Media.Body>
										<Media.Heading>
											<a href={article.web_url} target='_blank'>{article.headline.main}</a>
										</Media.Heading>
										<p>{article.snippet}</p>
										<p>{moment(article.pubdate).format('LLLL')}</p>
									</Media.Body>
								</Media.ListItem>
							)
						})
					}}
				</Media.List>
			</FlipMove>
		)} else {
				return (
					<Media>
						<Media.Body>
							<p><em>Please search for another term for better results.</em></p>
						</Media.Body>
					</Media>
				)
		}
	}

	render() {

		return (

			<div className="panel panel-primary">
				<PanelHeading toggle={this.toggleExpand.bind(this)} glyph='calendar' title='Top Articles'/>
        <Collapse in={this.state.open}>
        	<div className="panel-body">
        		{this.renderResultsList}
        	</div>
        </Collapse>
    	</div>

		)
	}

}