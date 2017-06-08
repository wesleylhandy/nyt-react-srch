import React from 'react';
import { Media, Image } from 'react-bootstrap';
import moment from 'moment';

export default props => (
	<span>
		<Media.Left>
			<a href={props.article.web_url} target="_blank">
				<Image src={props.imgSrc} alt={`Image for ${props.article.headline.main}`} height={75} width={75}/>
			</a>
		</Media.Left>
		<Media.Body>
			<Media.Heading>
				<a href={props.article.web_url} target='_blank'>{props.article.headline.main}</a>
			</Media.Heading>
			<p>{props.article.snippet}</p>
			<p>{moment(props.article.pub_date).format('LLLL')}</p>
		</Media.Body>
	</span>
)