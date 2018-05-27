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

class CurrencyStore {
  @serializable @observable currency = ''; 
  @observable loading = true;
  @observable currencies = [];  
   @observable error = '';
   
  constructor () {
	this.getData();
  };
	
  @action setCurrency(incurrency) {
	  this.currency = incurrency;
	  localStorage.setItem('Currency', JSON.stringify(serialize(SerData, incurrency)) );
  };
 
  @action 
  async getData() {
	try {
		const res =  await fetch('https://api.pleasepay.co.uk/currencies'); 
		const cur = await res.json();	  
		runInAction(() => {
			this.currencies = cur.items.map( e => {
					return {value: e.translations.en, label: e.translations.en};
				});
			this.currency = JSON.parse(localStorage.getItem('Currency'));
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

export default CurrencyStore;