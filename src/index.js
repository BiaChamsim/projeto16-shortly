import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
app.use(cors());
app.use(json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('servidor funfando!!')
});