import express from 'express'

const indexRouter = express.Router()
import { indexController } from '../controller/index-controller.mjs'

// JavaScript kann "this" verloren gehen und mit bind instanz von indexController wird garantiert auf this verbunden. --> erlaubt sichere verwendung von this innerhalb der Klasse. ist aber im projekt nicht nötig
indexRouter.get('/', indexController.index.bind(indexController))
indexRouter.get('/index', indexController.index)
indexRouter.post('/index', indexController.redirectPost)

export const indexRoutes = indexRouter
