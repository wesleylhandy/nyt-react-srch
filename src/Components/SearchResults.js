import React, { Component } from 'react';
import { Collapse, Image, Media } from 'react-bootstrap';
import FlipMove from 'react-flip-move';
import Moment from 'moment';

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
						{()=> this.props.articles.map((article, index)=> (
							<Media.ListItem key='index'>
								<Media.Left>
									<a href={article.web_url} target="_blank">
										<Image src={article.multimedia.findIndex(e=>e.subtype==='thumbnail') ?
											`https://www.nytimes.com/${article.multimedia.find((e, i, a)=> e.subtype==='thumbnail' ? a[i].url)}` : 'https://placehold.it/75x75?text=No+Image'
										} alt={`Image for ${article.headline.main}`} height='75' width='75'/>
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
						)}
						</Media.List>
				</FlipMove>
			}
		)
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