const express = require('express')
const Pets = require('../models/cat')
const breeds = require('../models/breed')

const getAllPets = async () => {
    const pets = await Pets.find().lean()
    return pets
}

const getCurrentPet = async (id) => {
    const pet = await Pets.findById(id).lean()
    return pet
}

const getCurrentBreed = async (id) => {
    const breed = await breeds.findById(id).lean()
    return breed.breed
}

const updatePetParams = async (id, name, description, upload) => {
    await Pets.findByIdAndUpdate(id, {
        name, 
        description, 
        upload
    })
}


module.exports = {
    getAllPets,
    getCurrentPet,
    getCurrentBreed,
    updatePetParams
}