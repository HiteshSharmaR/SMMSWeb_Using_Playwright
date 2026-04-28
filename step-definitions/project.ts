import { Given, When, Then } from '@cucumber/cucumber';
import { getData } from '../utils/dataHelper'
import { ProjectPage } from '../pages/common/project/project';

let projectPage: ProjectPage;
When('user fills project form data using {string}', async function (dataKey: string) {
    const projectPage = new ProjectPage(this.page);
    const data = await getData("project", dataKey);
    await projectPage.fillProjectForm(data);
});

When('user delete project record {string}', async function (dataKey: string) {
    const projectPage = new ProjectPage(this.page);
    const data = await getData("project", dataKey);
    await projectPage.deleteProjectRecord(data);
})