const express = require('express')
const Pet = require('../models/cat')
const Breed = require('../models/breed')
const { getAllPets, getCurrentPet, getCurrentBreed, updatePetParams } = require('../controllers/pets')
const { getBreed } = require('../controllers/breeds')

const router = express.Router()

// MAIN PAGE ROUTER
router.get('/', async (req, res) => {
    const pets = await getAllPets()
    res.render('index', {
        title: 'Pet Shelter | Main Page',
        pets
    })
})

// ADD BREED ROUTER
router.get('/add-breed', (req, res) => {
    res.render('addBreed' , {
        title: 'Pet Shelter | Add Pet Breed'
    })
})

router.post('/add-breed', (req, res) => {
    const {
        breed
    } = req.body

    const newBreed = new Breed({breed})

    newBreed.save((err) => {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/')
        }
    })
})

// ADD PET ROUTER
router.get('/add-cat', async (req, res) => {
    const breed = await getBreed()
    res.render('addCat', {
        title: 'Pet Shelter | Add Pet',
        breed
    })
})

router.post('/add-cat', (req, res) => {
    const {
        name,
        description,
        upload,
        breed
    } = req.body

    const pet = new Pet({name, description, upload, breed})

    pet.save((err) => {
        if (err) {
            console.error(err)
            res.redirect('/add-cat')
        } else {
            res.redirect('/')
        }
    })
})
// EDIT PET ROUTER
router.get('/edit-pet/:id', async (req, res) => {
    const pets = await getCurrentPet(req.params.id)
    const breed = await getCurrentBreed(pets.breed)

    res.render('editCat', {
        title:'Pet Shelter | Edit Pet Info',
        ...pets,
        // breed,
        breed
    })
})

router.post('/edit-pet/:id', async (req, res) => {
    const {
        name,
        description,
        upload
    } = req.body

    await updatePetParams(req.params.id, name, description, upload)
    
    res.redirect('/')
})

// PET SHELTER ROUTER
router.get('/pet-shelter/:id', async (req,res) => {
    const currentPet = await getCurrentPet(req.params.id)
    res.render('catShelter', {
        title: 'Pet Shelter | Shelter Pet',
        ...currentPet
    })
})

// 404 router - NO RELEVANT PAGE!!!
router.get('*', (req, res) => {
    res.render('index', {
        message: 'Page not found',
    })
})

module.exports = router