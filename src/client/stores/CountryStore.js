import { observable, action, computed, runInAction } from "mobx";
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
  @observable error = '';
  
  constructor () {
	this.getData();
  };
	
  @action setCountry(incountry) {
	  this.country = incountry;
	  incountry ? localStorage.setItem('Country', JSON.stringify(serialize(SerData, incountry)) ) : localStorage.removeItem('Country');
  };
 
  @action
  async getData() {
	try {  
		const res =  await fetch('https://api.pleasepay.co.uk/countries'); 
		const coun = await res.json();
		runInAction(() => {
			this.countries = coun.items.map( e => {
						return {value: e.translations.en, label: e.translations.en, currency: e.preferredCurrency.name};
					});
			this.country = JSON.parse(localStorage.getItem('Country'));
			this.loading = false;
		});
    } catch(e) {
		runInAction(() => {
			this.loading = false;
			this.error = e.message;
			console.log(this.error);
		});
    };
  };	
};

export default CountryStore;