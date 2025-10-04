"use server"
import mongoose from "mongoose";
export default async function connectDB() {
   
    const state = mongoose.connection.readyState;
    if (state != 1) {
        await mongoose.connect(`${process.env.DATABASE_URL}`, {
            dbName: 'Social-media-automation'
        })
        let connection = mongoose.connection;
        connection.on('connected', () => { console.log('connected succesfuly ') })
        connection.on('error', (error) => { console.log(error) })
        console.log('db connected ')

    }
    else {
      
    }
}