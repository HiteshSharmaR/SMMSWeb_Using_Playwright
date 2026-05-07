import { Given, When, Then } from '@cucumber/cucumber';
import {getData} from '../utils/dataHelper'
import {AssetType} from '../pages/common/asset_Type/assetType';

 let assetType: AssetType;

When('user creates asset type data using {string}', async function (dataKey: string) {
     const assetType = new AssetType(this.page);
     const data = await getData("assetType", dataKey); 
     await assetType.fillAssetType(data);
});

When('user delete asset type data using {string}', async function (dataKey: string){
     const assetType = new AssetType(this.page);
     const data = await getData("assetType", dataKey); 
     await assetType.deleteAssetTypeRecord(data);
})