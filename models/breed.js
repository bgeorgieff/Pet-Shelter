const mongoose = require('mongoose')

const BreedSchema = new mongoose.Schema({
    breed: {
        type: String,
        required: true
    },
    pets: [{
        type: 'ObjectId',
        ref: 'Pets'
    }]
})

module.exports = mongoose.model('Breed', BreedSchema)