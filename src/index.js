import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRouter from "./routes/authRouter.js";
import urlsRouter from "./routes/urlsRouter.js";
import usersRouter from "./routes/usersRouter.js";
import rankingRouter from "./routes/rankingRouter.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(json());

app.use(authRouter);
app.use(urlsRouter);
app.use(usersRouter);
app.use(rankingRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('servidor funfando!!')
});