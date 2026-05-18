import { contact } from './contact.locator';
import { Page } from '@playwright/test';
import { Dropdown } from '../../../utils/dropdown'
import { Modal } from '../../../utils/modalHelper'

export class Contact {
    constructor(private page: Page) { }

    async fillContactForm(data: any) {
        const contactId = data.AddressID ?? data.ContactId ?? 'Test';
        const contactName = data.Name ?? data.ContactName ?? 'Test';
        const contactType = data.ContactType ?? data.Type ?? 'Maker';

        await this.page.fill(contact.CONTACT_ID, contactId);
        await this.page.fill(contact.CONTACT_NAME, contactName);

        await this.page.click(contact.CONTACT_TYPE_ADD_BUTTON);
        await this.page.waitForSelector(contact.CONTACT_TYPE_DROPDOWN, { state: 'visible', timeout: 5000 });
        await this.page.click(contact.CONTACT_TYPE_DROPDOWN, { force: true });

        const dropdown = new Dropdown(this.page);
        await dropdown.selectDropdown(contactType);
        await this.page.click(contact.CONTACT_SAVE_BUTTON);
        const modal = new Modal(this.page);
        await modal.closeToastIfPresent();
    }

    async deleteContactRecord(data: any) {
        const contactId = data.AddressID ?? data.ContactId ?? data.Id ?? data.ID ?? '';

        const searchInput = this.page.locator(contact.CONTACT_SEARCH_INPUT);
        console.log('deleteContactRecord: waiting for search input');
        await searchInput.waitFor({ state: 'visible', timeout: 60000 });
        console.log('deleteContactRecord: search input visible');

        await searchInput.click({ force: true });
        await searchInput.fill('');
        await searchInput.type(contactId);
        await this.page.waitForTimeout(250);
        console.log('deleteContactRecord: search input value set');
        await searchInput.press('Enter');
        console.log('deleteContactRecord: Enter pressed');

        // Give grid a moment to refresh and then dump visible rows for debugging
        await this.page.waitForTimeout(500);
        const rowsLocator = this.page.locator('tr.e-row');
        const rowsCount = await rowsLocator.count();
        console.log(`deleteContactRecord: rowsCount=${rowsCount}`);
        for (let i = 0; i < rowsCount; i++) {
            const text = await rowsLocator.nth(i).innerText().catch(() => '');
            console.log(`deleteContactRecord: row[${i}]="${text.replace(/\n/g, ' | ')}"`);
        }

        const record = this.page.locator(contact.CONTACT_DISPLAYED_RECORDS, { hasText: contactId }).first();
        await record.waitFor({ state: 'visible', timeout: 60000 });
        console.log('deleteContactRecord: record visible');
        await record.click({ button: 'right' });

        await this.page.locator(contact.CONTACT_CONTEXT_MENU_OPTION, { hasText: 'Delete' }).click();
        await this.page.locator(contact.CLICK_ON_CONTACT_DELETE_PROCEED_BUTTON).click();

        const modal = new Modal(this.page);
        await modal.closeToastIfPresent();
    }
}