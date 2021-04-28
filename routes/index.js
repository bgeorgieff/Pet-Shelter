const express = require('express')
const Pet = require('../models/cat')
const Breed = require('../models/breed')
const { getAllPets, getCurrentPet } = require('../controllers/pets')

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
router.get('/add-cat', (req, res) => {
    res.render('addCat', {
        title: 'Pet Shelter | Add Pet'
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
router.get('/edit-pet/:id', async (req, res) => {;
    const currentPet = await getCurrentPet(req.params.id)
    res.render('editCat', {
        title:'Pet Shelter | Edit Pet Info',
        ...currentPet
    })
})

// Pet Shelter Router
router.get('/pet-shelter/:id', async (req,res) => {
    res.render('catShelter', {
        title: 'Pet Shelter | Shelter Pet'
    })
})

// 404 router - no page for the moment
router.get('*', (req, res) => {
    res.render('index', {
        message: 'Page not found',
    })
})

module.exports = router