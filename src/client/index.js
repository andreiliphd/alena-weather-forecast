import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'
import { getAPI } from './js/postRequest'


import "./styles/style.scss";

const datepicker = require('js-datepicker');
console.log(new Date(Date.now()));
const picker = datepicker('#date', { minDate: new Date(Date.now()), maxDate: new Date(Date.now() + 15*24*60*60*1000)});


export {
    checkForName,
    handleSubmit,
    getAPI
}
   

