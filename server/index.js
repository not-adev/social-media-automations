import express from 'express';
import dotenv from 'dotenv';
import RegisterRouters from './routes.js';
import polling_for_scheduling from './scheduler.js';
import connectDB from './DatabaseConnection.js';
import mongoose from 'mongoose';
dotenv.config()

const app = express()
const port = 5000
polling_for_scheduling()

app.use((req, res, next) => {
    const today = new Date()
    console.log('---API called at', today, process.env.HOST + req.originalUrl);
    next(); // pass to next middleware or route

})
RegisterRouters(app)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})