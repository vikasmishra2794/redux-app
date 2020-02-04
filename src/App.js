import React, { Component } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import './App.css';

import { weatherAction } from './actions/weatherAction'

/* 
 * mapDispatchToProps
*/
const mapDispatchToProps = dispatch => ({
  weatherAction: (zipCode) => dispatch(weatherAction(zipCode))
})

/* 
 * mapStateToProps
*/
const mapStateToProps = state => ({
  weatherData: state.weatherReducer
})
/**
 * @class App
 * @extends {Component}
 */
class App extends Component {
  /**
   * @memberof App
   * @summary handles button click 
   */
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      error:""
    };
    this.cityList = [
      { label: "New York", zipCode: "10025" },
      { label: "California", zipCode: "23060" },
      { label: "Chicago", zipCode: "60602" },
      { label: "Florida", zipCode: "32003" }
    ];
  }

  handleButtonClick = (event) => {
    const { selectedOption } = this.state;
    if (selectedOption) {
      this.setState({
        error: ""
      }, () => {
        this.props.weatherAction(selectedOption.zipCode);          
      })
    } else {
      this.setState({
        error: "Please select a City."
      })
    }
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  }

  render() {
    const { selectedOption } = this.state;
    const { weatherData } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={this.cityList}
            />
          </div>
          <div className="col-md-4">
            <button type="button" className="btn btn-primary" onClick={this.handleButtonClick}>Weather Info</button>
          </div>
          {(!this.state.error && !weatherData.isFetching) && <div className="row">
            <pre>{JSON.stringify(weatherData, null, 2)}</pre>
            </div>}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
