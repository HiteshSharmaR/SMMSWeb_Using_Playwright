import fs from 'fs';
import path from 'path';

export function getData(formType: string, dataKey: string) {
  const filePath = path.join(
    process.cwd(),
    `test-data/${formType}/data.json`
  );

  const raw = fs.readFileSync(filePath, 'utf-8');
  const json = JSON.parse(raw);
  console.log("FILE PATH:", filePath);
  console.log("DATA KEY:", dataKey);
  const data = json[dataKey];

  if (!data) {
    throw new Error(`❌ No data found for key: ${dataKey}`);
  }
  return data; 
}