import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';

import PanelHeading from './PanelHeading';
import ResultsListItems from './ResultsListItems';

export default class SearchResults extends Component {

	constructor(props) {
		super(props);
		this.state={
			open: false,
			articles: []
		}
	}

	componentWillReceiveProps(nextProps) {
    this.setState({open: nextProps.open, articles: [...nextProps.articles]});
  }

  toggleExpand() {
		this.setState({open: !this.state.open});
	}

	render() {

		return (

			<div className="panel panel-primary">
				<PanelHeading toggle={this.toggleExpand.bind(this)} glyph='calendar' title='Search Results'/>
        <Collapse in={this.state.open}>
        	<div className="panel-body">
        		<ResultsListItems articles={this.state.articles}/>
        	</div>
        </Collapse>
    	</div>

		)
	}

}