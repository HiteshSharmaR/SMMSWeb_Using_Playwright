import { Given, When, Then } from '@cucumber/cucumber';
import {getData} from '../utils/dataHelper'
import {RankForm} from '../pages/common/rankForm/rankForm';

let rankForm: RankForm;

When('user fills rank form data using {string}', async function (dataKey: string) {
    const rankForm = new RankForm(this.page);
    const data = await getData("rank", dataKey); // 🔥 add await
    await rankForm.fillRankForm(data); // 🔥 add await
});

When('user delete rank form data using {string}', async function (dataKey: string) {
    const rankForm = new RankForm(this.page);
    const data = await getData("rank", dataKey); 
    await rankForm.deleteRank(data);
});