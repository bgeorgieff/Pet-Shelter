const express = require('express')
const Pets = require('../models/cat')

const getAllPets = async () => {
    const pets = await Pets.find().lean()
    return pets
}

const getCurrentPet = async (id) => {
    const pet = await Pets.findById(id).lean()
    return pet
}

module.exports = {
    getAllPets,
    getCurrentPet
}