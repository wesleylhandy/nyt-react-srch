import React, { Component } from 'react';
import './App.css';

import Header from './Components/Header';
import Footer from './Components/Footer';
import SearchForm from './Components/SearchForm';
import SearchResults from './Components/SearchResults';

class App extends Component {
	constructor(props) {
		super(props);
		this.state={
			formOpen: true,
			resultsOpen: false,
			favoritesOpen: false,
			articles: []
		}
	}

	getArticles(queryURL){
		fetch(queryURL).then(response => response.json())
			.then(data => this.setState({formOpen: false, resultsOpen: true, articles:[...data.response.docs]}));
	}


  render() {
    return (
      <div className="App">

        <Header/>

        <SearchForm open={this.state.formOpen} callFetch={this.getArticles.bind(this)}/>

        <SearchResults open={this.state.resultsOpen} articles={this.state.articles}/>

        <Footer/>

      </div>
    );
  }
}

export default App;
