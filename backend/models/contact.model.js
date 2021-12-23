const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true, length: 10 },
    address: { type: String, required: true },
    age: { type: Number, required: true }
},
    {
        timestamps: true
    });

const Contact = mongoose.model('Contact', contactSchema)
module.exports = Contact