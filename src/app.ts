import express, { Request, Response } from 'express';
import { readData } from "./fs";
import cors from 'cors';

const app = express();
const PORT = 3000;
app.use(cors());

// Read data from file system
let TOKEN_DATA: any = null;
readData()
  .then(data => {
    TOKEN_DATA = data;
  })
  .catch(err => {
    console.error('Error reading data:', err);
  });

app.get('/', (req: Request, res: Response) => {
  try {
    if (TOKEN_DATA) {
      res.json(TOKEN_DATA);
    } else {
      res.status(500).json({ error: 'Data not loaded yet' });
    }
  } catch (err) {
    console.error('Error handling request:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
