import React from 'react';
import {Button, Glyphicon} from 'react-bootstrap';

export default props => (
	<div className="panel-heading">
		<div className='clearfix'>
      <span className='pull-left'><Glyphicon glyph={props.glyph}/>&nbsp;{props.title}</span>

    	<Button className='pull-right' bsStyle='default' bsSize='xsmall' onClick={props.toggle}>
    		<i className="fa fa-arrows-v" aria-hidden="true"></i>
    	</Button>
    </div>
  </div>
)