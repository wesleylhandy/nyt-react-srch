import React from 'react';
import { Media, Image } from 'react-bootstrap';

import '../styles/notification-tab.css';

export default props => {
	if(props.article.title) {
		return (
			<Media>
				<Media.Left>
					<a href={props.article.url} target="_blank">
						<Image src={props.article.imgsrc} alt={`Image for ${props.article.title}`} height={75} width={75}/>
					</a>
				</Media.Left>
				<Media.Body>
					<Media.Heading>
						<p>New Article Recently Saved</p>
					</Media.Heading>
						<a href={props.article.url} target='_blank' className='notification-tab--truncate'>{props.article.title}</a>
				</Media.Body>
			</Media>
		)
	} else {
		return (
			<Media>
				<p><em>No recently saved articles. Please search for an article and click on the bookmark icon to save a new article to read later.</em></p>
			</Media>
		)
	}
}