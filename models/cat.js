const mongoose = require('mongoose')

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true,
    },
    upload: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Pet', PetSchema)