import React from 'react';

export default () => {

	const date = new Date().getFullYear();
	return (
		<footer className="footer text-center">
	    <span>Copyright&nbsp;
	    	<i className="fa fa-copyright" aria-hidden="true"></i>
	    	{date}&nbsp;Wesley L. Handy
	    </span>
	    <div className="gh-link">
	    	<a href="https://github.com/wesleylhandy/NYTSearch" target="_blank">
	    		<i className="fa fa-github" aria-hidden="true"></i>
	    	</a>
	    </div>
		</footer>
	)
}