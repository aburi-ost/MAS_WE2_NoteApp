import express from 'express'
const detailsRouter = express.Router()
import { detailsController } from '../controller/details-controller.mjs'

detailsRouter.get('/', detailsController.detailsEmpty)
detailsRouter.post('/', detailsController.createEntry)
detailsRouter.get("/:id/", detailsController.detailsByID);
detailsRouter.put('/:id/', detailsController.updateEntry)

export const detailsRoutes = detailsRouter
