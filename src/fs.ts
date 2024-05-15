import fs from 'fs';
import path from 'path';

const dataPath = path.join(__dirname, '../_data');

export function readData(): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.readdir(dataPath, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                reject(err);
                return;
            }

            const jsonData: any = {};

            files.forEach(file => {
                if (file.endsWith('.json')) {
                    const key = file.replace('.json', ''); // Remove .json extension
                    const filePath = path.join(dataPath, file);
                    const fileData = fs.readFileSync(filePath, 'utf8');
                    try {
                        const parsedData = JSON.parse(fileData);
                        jsonData[key] = parsedData;
                    } catch (error) {
                        console.error(`Error parsing JSON file ${file}:`, error);
                    }
                }
            });

            resolve(jsonData);
        });
    });
}
