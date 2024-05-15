import fs from 'fs';
import path from 'path';

const dataPath = path.join(__dirname, '../_data');

export function readData(): Promise<{ [filename: string]: any }> {
    return new Promise((resolve, reject) => {
        fs.readdir(dataPath, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                reject(err);
                return;
            }

            const jsonData: { [filename: string]: any } = {};

            files.forEach(file => {
                if (file.endsWith('.json')) {
                    const fileName = file.replace('.json', '');
                    const filePath = path.join(dataPath, file);
                    const fileData = fs.readFileSync(filePath, 'utf8');
                    try {
                        const parsedData = JSON.parse(fileData);
                        jsonData[fileName] = parsedData;
                    } catch (error) {
                        console.error(`Error parsing JSON file ${file}:`, error);
                    }
                }
            });

            resolve(jsonData);
        });
    });
}
