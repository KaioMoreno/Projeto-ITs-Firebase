import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './database/MongoDB.js';
import routes from './routes/routes.js';
import admin from 'firebase-admin';
import path from 'path';

const app = express();
const port = 8080;

dotenv.config();

app.use('/uploads', express.static('Server/uploads'));
app.use(express.json());


app.use(cors({
    origin: 'URL',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));


app.use(routes);


connectDB();

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});
