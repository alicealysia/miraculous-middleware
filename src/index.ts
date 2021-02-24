import express from "express";
import {config} from 'dotenv';
import {Request, Response} from 'express';

config();
const app = express();
const port = 8080;
app.use(express.json());

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
})