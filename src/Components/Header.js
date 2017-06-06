import React from 'react';
import { Jumbotron} from 'react-bootstrap';

export default () => {
	return (
		<Jumbotron>
      <h1><i className="fa fa-newspaper-o" aria-hidden="true"></i>
				New York Times Article Search</h1>
      <div className="NYTimage">
          <a href="http://developer.nytimes.com/" target="_blank">
          	<img src="assets/images/poweredby_nytimes_150c.png" alt="Powered By The New York Times"/></a>
      </div>
    </Jumbotron>
  )
}