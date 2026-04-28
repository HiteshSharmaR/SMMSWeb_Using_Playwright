import { Given, When, Then } from '@cucumber/cucumber';
import {getData} from '../utils/dataHelper'
 import {LocationPage} from '../pages/common/locationForm/locationPage';

 let locationPage: LocationPage;

When('user fills location form data using {string}', async function (dataKey: string) {
     const locationPage = new LocationPage(this.page);
     const data = await getData("location", dataKey); 
     await locationPage.fillLocation(data);
});