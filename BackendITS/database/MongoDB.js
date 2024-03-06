import mongoose from 'mongoose'
import express from 'express'
import multer from 'multer'


const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Conexão estabelecida com o MongoDB')

    } catch(error) {
        console.error(error)
    }
}


export default connectDB;