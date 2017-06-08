import React from 'react';
import { Media, Image } from 'react-bootstrap';
import moment from 'moment';

export default props => (
	
		<Media.Left>
			<a href={props.article.url} target="_blank">
				<Image src={props.imgSrc} alt={`Image for ${props.article.title}`} height={75} width={75}/>
			</a>
		</Media.Left>
		<Media.Body>
			<Media.Heading>
				<a href={props.article.url} target='_blank'>{props.article.title}</a>
			</Media.Heading>
			<p>{props.article.snippet}</p>
			<p>{moment(props.article.pubdate).format('LLLL')}</p>
		</Media.Body>
)