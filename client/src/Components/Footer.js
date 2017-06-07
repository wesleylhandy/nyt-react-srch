import React from 'react';
import '../styles/footer.css';

export default () => {

	const date = new Date().getFullYear();
	return (
		<footer className="footer text-center">
	    <span>Copyright&nbsp;
	    	<i className="fa fa-copyright" aria-hidden="true"></i>
	    	{date}&nbsp;Wesley L. Handy
	    </span>
	    <div>
	    	<a href="https://github.com/wesleylhandy/nyt-react-srch" target="_blank">
	    		<i className="fa fa-github" aria-hidden="true"></i>
	    	</a>
	    </div>
		</footer>
	)
}