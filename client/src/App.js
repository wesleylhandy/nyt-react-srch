import React, { Component } from 'react';

import Header from './Components/Header';
import Footer from './Components/Footer';
import SearchForm from './Components/SearchForm';
import SearchResults from './Components/SearchResults';
import FavoritesList from './Components/FavoritesList';

//client side socket connection
import io from 'socket.io-client'; 
const socket = io(); 

class App extends Component {
	constructor(props) {
		super(props);
		this.state={
			formOpen: true,
			resultsOpen: false,
			favoritesOpen: false,
			articles: [],
			favoriteArticles: []
		}
	}

	getArticles(queryURL){
		fetch(queryURL).then(response => response.json())
			.then(data => this.setState({formOpen: false, resultsOpen: true, articles:[...data.response.docs]}));
	}

  render() {
    return (
      <div className="App">
        <div className="container">

        	<Header/>

	        <SearchForm 
	        	open={this.state.formOpen} 
	        	callFetch={this.getArticles.bind(this)}
	        />

	        <SearchResults 
	        	open={this.state.resultsOpen} 
	        	articles={this.state.articles} 
	        />

	        <FavoritesList
	        	open={this.state.favoritesOpen}
	        	articles={this.state.favoriteArticles}
	        />

	      </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
