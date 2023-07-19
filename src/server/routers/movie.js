const express = require('express')
const { createMovie, getAll } = require('../controllers/movie')

const router = express.Router()

router.post('/', createMovie)

router.get('/', getAll)

module.exports = router
