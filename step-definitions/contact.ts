import { Given, When, Then } from '@cucumber/cucumber';
import {getData} from '../utils/dataHelper'
import {Contact} from '../pages/common/contact/contact';

 let contact: Contact;

When('user creates contact record using {string}', async function (dataKey: string) {
     
});