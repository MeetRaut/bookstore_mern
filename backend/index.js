// index.js
import express, { request, response } from "express";
import cors from 'cors';
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {Book} from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';

//const cors = require('cors');
const app = express();


// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy 
// Option 1: Allow All Origins with Default of cors(*)
// Enable CORS
// app.use(cors());

// Option 2: Allow Custom origins
/*
app.use(
    cors({
        origin: 'https://localhost:5555',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
)
*/
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
  };
  
app.use(cors(corsOptions));
 

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome')
});

app.use('/books', booksRoute);
 
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, ()=>{
            console.log(`APP is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });