const result = require('dotenv').config();
const express = require('express');
import {bootFunc} from './boot';

const app = express();
const port = 8080;
app.use(express.json());


if (result.parsed) {
    console.log(result.parsed);
    bootFunc();
} else {
    throw result.error;
}

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
})