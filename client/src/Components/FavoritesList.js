import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';

import PanelHeading from './PanelHeading';
import FavoritesListItems from './FavoritesListItems';

export default class FavoritesList extends Component {

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

			<div className="panel panel-default">
				<PanelHeading toggle={this.toggleExpand.bind(this)} glyph='fire' title='Saved Articles'/>
        <Collapse in={this.state.open}>
        	<div className="panel-body">
        		<FavoritesListItems articles={this.state.articles}/>
        	</div>
        </Collapse>
    	</div>

		)
	}

}