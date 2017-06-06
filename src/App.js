import React, { Component } from 'react';
import './App.css';

import Header from './Components/Header';
import Footer from './Components/Footer';
import SearchForm from './Components/SearchForm';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Header/>

        <SearchForm/>

        <Footer/>

      </div>
    );
  }
}

export default App;
