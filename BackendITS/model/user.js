import mongoose, { Mongoose } from 'mongoose'
import bcrypt from 'bcryptjs'

const userModel = new mongoose.Schema({

    nome: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    cargo: {
        type: String,
        enum:['QSMS', 'user'],
        default: 'user'
    },

    password: {
        type:String,
        required: true,
        trim: true
    }

},{timestamps:true});


userModel.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
});

export default mongoose.model('userModel', userModel)
