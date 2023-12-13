//use express
import express from 'express';
import { handler } from './svelte/build/handler.js';
import fs from 'fs/promises';
import csv from 'csv-parser';
import path from 'path';

const app = express()
const port = 3000


app.use(handler)

app.get('/', (req, res) => {
    res.send('Page Index')
})



app.listen(port, () => {
    console.log(`Cronos app listening at http://localhost:${port}`)
})