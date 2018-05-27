import React, { Component } from 'react';
import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import Select from 'react-select';

@inject("countryStore", "currencyStore")
@observer
class Country extends React.Component {
	constructor(props) {
		super(props);
	};

	handleCounChange = (selectedOption) => {
		this.props.countryStore.setCountry(selectedOption);
		this.props.currencyStore.setCurrency( {value: selectedOption.currency, label: selectedOption.currency} );		
	};
	
	render() {
		return (
			<div>
				<div className="lab">Country</div>
				<div className="l2"/>
				<div className="l3">
					<Select  id="country"
						name="countries"
						value={this.props.countryStore.country}
						onChange={this.handleCounChange}
						options={this.props.countryStore.countries}
					/>
				</div>
			</div>	
		);
	};		
};

@inject("currencyStore")
@observer
class Currency extends React.Component {
	
	constructor(props) {
		super(props);
	};
	
	handleCurChange = (selectedOption) => {
		this.props.currencyStore.setCurrency(selectedOption);
	};
	
	render() {
		return (
		<div>
			<div className="lab">Currency</div>
			<div className="l2"/>
			<div className="l3">
				<Select 
					name="currencies"
					value={this.props.currencyStore.currency}
					onChange={this.handleCurChange}
					options={this.props.currencyStore.currencies}
				/>
			</div>
		</div>	
		);
	}; 
};

@inject("countryStore", "currencyStore")
@observer
class App extends React.Component {
	
	constructor(props) {
		super(props);
	};
	
	render() {
		if ((this.props.countryStore.error!='') || (this.props.currencyStore.error!='')) {
			return (<div> <span>Error...try to upload page</span> </div>);
		} else if (this.props.countryStore.loading || this.props.currencyStore.loading) {
			return (<div> <span>Loading...</span> </div>);
		} else {
			return (
			<div className="container">
				<div className="Dropdowns">
					<Country/>  			  
					<div className="Pause"/>
					<Currency/>
				</div>
			</div>
			);
		};
	}; 

};

export default App;