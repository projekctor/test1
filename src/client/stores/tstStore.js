import { observable, action, computed } from "mobx";
import {
    createModelSchema,
	createSimpleSchema,
    primitive,
    reference,
    list,
    object,
    identifier,
    serialize,
    deserialize,
    serializable,	
} from 'serializr';

var SerData = createSimpleSchema({
    value: true,
    label: true
}); 

class CountryStore {
  @serializable @observable country = '';
  @observable loading = true;
  @observable countries = [];
  
  constructor () {
	  getData();
  }
	
  @action setCountry(incountry) {
	  this.country = incountry;
	  localStorage.setItem('Country', JSON.stringify(serialize(SerData, incountry)) );
  }
 
  @action 
  async getData() {
  	this.loading = true;
    const coun = await fetch('https://api.pleasepay.co.uk/countries').then(res => res.json());
	this.countries = coun.items.map( e => {
					return {value: e.translations.en, label: e.translations.en, currency: e.preferredCurrency.name};
				});
	this.country = JSON.parse(localStorage.getItem('Country'));
	this.loading = false;
  } 	
};

class CurrencyStore {
  @serializable @observable currency = ''; 
  @observable loading = true;
  @observable currencies = [];  
  
    constructor () {
	  getData();
  }
	
	
  @action setCurrency(incurrency) {
	  this.currency = incurrency;
	  localStorage.setItem('Currency', JSON.stringify(serialize(SerData, incurrency)) );
  }
 
  @action 
  async getData() {
  	this.loading = true;
	
    const cur = await fetch('https://api.pleasepay.co.uk/currencies').then(res => res.json());
	this.currencies = cur.items.map( e => {
			return {value: e.translations.en, label: e.translations.en};
		});
	this.countries = coun.items.map( e => {
					return {value: e.translations.en, label: e.translations.en, currency: e.preferredCurrency.name};
				});
	this.country = JSON.parse(localStorage.getItem('Country'));
	this.currency = JSON.parse(localStorage.getItem('Currency'));
	this.loading = false;
  } 
};

/*
class TstStore {
  @serializable @observable country = '';
  @serializable @observable currency = ''; 
  @observable loading = true;
  @observable countries = [];
  @observable currencies = [];  
	
  @action setCountry(incountry) {
	  this.country = incountry;
	  const obj = serialize(SerData, incountry);
	  console.log(JSON.stringify(obj));	  
	  localStorage.setItem('Country', JSON.stringify(obj));
  }
 
  @action setCurrency(incurrency) {
	  this.currency = incurrency;
 	  const obj = serialize(SerData, incurrency);
	  console.log(JSON.stringify(obj));
	  localStorage.setItem('Currency', JSON.stringify(obj));
  }
 
  @action 
  async getData() {
  	this.loading = true;
	
    //const cur = await fetch('https://api.pleasepay.co.uk/currencies').then(res => res.json());
    //const coun = await fetch('https://api.pleasepay.co.uk/countries').then(res => res.json());
	
	this.currencies = cur.items.map( e => {
			return {value: e.translations.en, label: e.translations.en};
		});
	this.countries = coun.items.map( e => {
					return {value: e.translations.en, label: e.translations.en, currency: e.preferredCurrency.name};
				});
	this.country = JSON.parse(localStorage.getItem('Country'));
	this.currency = JSON.parse(localStorage.getItem('Currency'));
  
	this.loading = false;
  } 
}

export default TstStore;*/
export {CurrencyStore, CountryStore};