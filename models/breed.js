const mongoose = require('mongoose')

const BreedSchema = new mongoose.Schema({
    breed: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Breed', BreedSchema)