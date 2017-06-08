import React, { Component } from 'react';

import '../styles/notification-tab.css';

//client side socket connection
import io from 'socket.io-client'; 
const socket = io(); 

export default class NotificationTab extends Component {
	constructor(props) {
		super(props);
		this.state={
			tabOpen: false,
			newArticle: {}
		}
		socket.on('new-save', payload => this.updateSavedArticles(payload));

	}

	updateSavedArticles(payload) {
    this.setState({newArticle: payload.article});
  }

  render() {

  	return (
  		<div className = 'notification-tab'>
  		</div>
  	);
  }
}