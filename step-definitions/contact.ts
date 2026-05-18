import { Given, When, Then } from '@cucumber/cucumber';
import { getData } from '../utils/dataHelper'
import { Contact } from '../pages/common/contact/contact';

let contact: Contact;

When('user creates contact record using {string}', async function (dataKey: string) {
    const contact = new Contact(this.page);
    const data = await getData("contact", dataKey);
    await contact.fillContactForm(data);
});

When('user deletes contact record using {string}', async function (dataKey: string) {
    const contact = new Contact(this.page);
    const data = await getData("contact", dataKey);
    await contact.deleteContactRecord(data);
});