import React from 'react';
import { Jumbotron} from 'react-bootstrap';
import '../styles/page-header.css';


export default () => {
	return (
		<Jumbotron bsClass='page-header'>
      <h1><i className="fa fa-newspaper-o" aria-hidden="true"></i>
				New York Times Article Search</h1>
      <div className="page-header__badge">
          <a href="http://developer.nytimes.com/" target="_blank">
          	<img src="assets/images/poweredby_nytimes_150c.png" alt="Powered By The New York Times"/></a>
      </div>
    </Jumbotron>
  )
}