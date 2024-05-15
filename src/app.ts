import express, { Request, Response } from 'express';
import { readData } from "./fs";
import cors from 'cors';

const app = express();
const PORT = 3000;
app.use(cors());

readData().then((jsonData: any) => {
    const responseData = {
        status: 1,
        data: jsonData
    };

    app.get('/', (req: Request, res: Response) => {
        res.json(responseData);
    });

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((err: any) => {
    console.error('Error reading data:', err);
});
