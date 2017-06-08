import React, { Component } from 'react';

import '../styles/notification-tab.css';
import MediaCard from './MediaCard';

//client side socket connection
import io from 'socket.io-client'; 
const socket = io(); 

export default class NotificationTab extends Component {
	constructor(props) {
		super(props);
		this.state={
			tabExpanded: false,
			newArticle: {}
		}
		socket.on('new-save', payload => this.updateSavedArticles(payload));
		this.toggleExpand = this.toggleExpand.bind(this);
	}

	updateSavedArticles(payload) {
		console.log(payload.article.article);
    this.setState({newArticle: payload.article.article, tabExpanded: true});
    setTimeout(this.toggleExpand, 2500);
  }

  toggleExpand() {
  	this.setState({tabExpanded: !this.state.tabExpanded});
  }

  render() {
  	const expanse = this.state.tabExpanded ? 50 : 0;
  	return (
  		<div 
  			className='notification-tab' 
  			style={{width: `${expanse}%`}} 
  			onMouseEnter={this.toggleExpand}
  			onMouseLeave={this.toggleExpand}
  		>
  			<MediaCard article={this.state.newArticle}/>
  		</div>
  	);
  }
}