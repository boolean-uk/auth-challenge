import express, { Router } from 'express'
import * as moviesController from '../controller/movies'
import authenticate from '../utils/authenticate'

const router: Router = express.Router()

router.get('/', authenticate, moviesController.getAllMovies)
router.post('/', authenticate, moviesController.createMovie)
router.delete('/:id', authenticate, moviesController.deleteMovie)
router.put('/:id', authenticate, moviesController.editMovie)

export default router
