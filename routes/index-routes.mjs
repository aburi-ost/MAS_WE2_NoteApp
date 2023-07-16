import express from 'express'
import { indexController } from '../controller/index-controller.mjs'

const indexRouter = express.Router()

// JavaScript kann "this" verloren gehen und mit bind instanz von indexController wird garantiert auf this verbunden. --> erlaubt sichere verwendung von this innerhalb der Klasse. ist aber im projekt nicht nötig
indexRouter.get('/', indexController.index.bind(indexController))
indexRouter.get('/index', indexController.index)
indexRouter.post('/index', indexController.redirectPost)

export const indexRoutes = indexRouter
