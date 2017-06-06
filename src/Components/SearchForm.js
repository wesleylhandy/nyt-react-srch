import React, {Component} from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Collapse } from 'react-bootstrap';

export default class SearchForm extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			searchTerms: '',
			startYear: undefined,
			endYear: undefined,
			numRecords: 10,
			open: true,
			currentYear: undefined
		};
	}

	componentWillMount() {
		const currentYear = new Date().getFullYear();
		this.setState({currentYear});
	}

	toggleExpand(e) {
		e.preventDefault();
		this.setState({open: !this.state.open});
	}

	handleInputChange(e){
		this.setState({searchTerms:e.target.value})
	}

	handleStartYearChange(e){
		this.setState({startYear: e.target.value});
	}
	
	handleSubmit(e) {
		e.preventDefault();
	}

	handleSelect(e) {
		this.setState({numRecords: e.target.value});
	}

	reset(e) {
		console.log(e);
		this.setState({searchTerms: '', startYear: undefined, endYear: undefined, numRecords: 10});
	}

	render() {
		
		return (
			<div className="panel panel-primary searchDisplay">
        <div className="panel-heading">
        	<span className="glyphicon glyphicon-list-alt"></span>&nbsp;Search Parameters

        	<Button className='pull-right' bsStyle='default' bsSize='xsmall' onClick={this.toggleExpand.bind(this)}>
        		<i className="fa fa-arrows-v" aria-hidden="true"></i>
        	</Button>

        </div>

        <Collapse in={this.state.open}>
        	<div className="panel-body">

          	<form onSubmit={this.handleSubmit.bind(this)}>

              <FormGroup>
                <ControlLabel>Search Term:</ControlLabel>
                <FormControl
                	type="text" 
                	placeholder="Anything" 
                	value={this.state.searchTerms}
                	onChange={this.handleInputChange.bind(this)}
                />
              </FormGroup>
        
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Number of Records to Retrieve</ControlLabel>
                <FormControl componentClass="select" onChange={this.handleSelect.bind(this)}>
                  <option>10</option>
                  <option>5</option>
                  <option>1</option>
                </FormControl>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Start Year (Optional):</ControlLabel>
                <FormControl 
                	type="number" 
                	min="1851" 
                	max={this.state.currentYear} 
                	placeholder="1851"
                	value={this.state.startYear}
                	onChange={this.handleStartYearChange.bind(this)}
                	/>
              </FormGroup>
              
              <FormGroup>
                <ControlLabel>End Year (Optional):</ControlLabel>
                <FormControl 
                	type="number" 
                	min="1851" 
                	max={this.state.currentYear} 
                	placeholder={this.state.currentYear}
                	value={this.state.endYear}/>
              </FormGroup>
          
              <Button type="submit" className='search-btn'>
              	<span className="glyphicon glyphicon-search"></span>
              	&nbsp;Search
              </Button>
              
              <Button	type="reset" className="reset-btn" onClick={this.reset.bind(this)}>
              	<span className="glyphicon glyphicon-trash"></span>
              	&nbsp;Clear
              </Button>
            
            </form>
        </div>
      </Collapse>
    </div>

		)


	}


}