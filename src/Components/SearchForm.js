import React, {Component} from 'react';
import { FormGroup, FormControl, ControlLabel, Glyphicon, Button, Collapse } from 'react-bootstrap';

export default class SearchForm extends Component {
	constructor(props) {
		super(props);
		this.reset = this.reset.bind(this)
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

  componentWillReceiveProps(nextProps) {
    this.setState({open: nextProps.open});
    if(!nextProps.open) {
      this.reset(null);
    }
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

	handleEndYearChange(e){
		this.setState({endYear: e.target.value});
	}
	
	handleSubmit(e) {
		e.preventDefault();
		const searchTerms = this.state.searchTerms.trim().replace(' ', "+");

		const startDate = this.state.startYear >= 1851 && this.state.startYear <= this.state.currentYear ? `&begin_date=${this.state.startYear}0101` : '';

		const endDate = this.state.endYear <= 2017 && this.state.endYear >= 1851 ? `&end_date=${this.state.endYear}1231` : '';

		const queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerms}&fq=source:(The+New+York+Times)&api-key=${process.env.NYT_API || '4bbabbfc37dd4786914ca930e35dd905'}${startDate}${endDate}`;
		
    this.props.callFetch(queryURL);
		
	}

	handleSelect(e) {
		this.setState({numRecords: e.target.value});
	}

	reset(e) {
		this.setState({searchTerms: '', startYear: undefined, endYear: undefined, numRecords: 10});
	}

	render() {
		
		return (
			<div className="panel panel-primary searchDisplay">
        <div className="panel-heading">
        	<div className='clearfix'>
            <span className='pull-left'><Glyphicon glyph='list-alt'/>&nbsp;Search Parameters</span>

          	<Button className='pull-right' bsStyle='default' bsSize='xsmall' onClick={this.toggleExpand.bind(this)}>
          		<i className="fa fa-arrows-v" aria-hidden="true"></i>
          	</Button>
          </div>
        </div>

        <Collapse in={this.state.open}>
        	<div className="panel-body">

          	<form onSubmit={this.handleSubmit.bind(this)}>

              <FormGroup>
                <ControlLabel className='pull-left'>Search Term:</ControlLabel>
                <FormControl
                	type="text" 
                	placeholder="Anything" 
                	value={this.state.searchTerms}
                	onChange={this.handleInputChange.bind(this)}
                />
              </FormGroup>
        
              <FormGroup controlId="formControlsSelect">
                <ControlLabel className='pull-left'>Number of Records to Retrieve</ControlLabel>
                <FormControl componentClass="select" onChange={this.handleSelect.bind(this)}>
                  <option>10</option>
                  <option>5</option>
                  <option>1</option>
                </FormControl>
              </FormGroup>

              <FormGroup>
                <ControlLabel className='pull-left'>Start Year (Optional):</ControlLabel>
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
                <ControlLabel className='pull-left'>End Year (Optional):</ControlLabel>
                <FormControl 
                	type="number" 
                	min="1851" 
                	max={this.state.currentYear} 
                	placeholder={this.state.currentYear}
                	value={this.state.endYear}
                	onChange={this.handleEndYearChange.bind(this)}
                />
              </FormGroup>
          
              <Button type="submit" className='pull-left'>
              	<span className="glyphicon glyphicon-search"></span>
              	&nbsp;Search
              </Button>
              
              <Button	type="reset" className="pull-left" onClick={this.reset}>
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