import express from 'express'
import { detailsController } from '../controller/details-controller.mjs'

const detailsRouter = express.Router()

detailsRouter.get('/', detailsController.detailsEmpty)
detailsRouter.post('/', detailsController.createEntry)
detailsRouter.get('/:id/', detailsController.detailsByID)
detailsRouter.put('/:id/', detailsController.updateEntry)

export const detailsRoutes = detailsRouter
