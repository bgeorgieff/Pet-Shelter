const express = require('express')
const Pets = require('../models/cat')
const Breed = require('../models/breed')

const getBreed = () => {
    const breeds = Breed.find().lean()
    return breeds
}

module.exports = {
    getBreed
}