// Import function for usage to because WebPack use IIFE that prevent global variables
import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'
import { getAPI } from './js/postRequest'

// Import styles
import "./styles/style.scss";

// Setting up data picker
const datepicker = require('js-datepicker');
console.log(new Date(Date.now()));
const picker = datepicker('#date', { minDate: new Date(Date.now()), maxDate: new Date(Date.now() + 15*24*60*60*1000)});

// Exporting functions
export {
    checkForName,
    handleSubmit,
    getAPI
}
   

