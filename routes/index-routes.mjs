import express from 'express'
import { indexController } from '../controller/index-controller.mjs'

const indexRouter = express.Router()

indexRouter.get('/', indexController.index.bind(indexController))
indexRouter.get('/index', indexController.index)
indexRouter.post('/index', indexController.redirectPost)

export const indexRoutes = indexRouter
