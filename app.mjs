import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import session from 'express-session'
import exphbs from 'express-handlebars'

import { indexRoutes } from './routes/index-routes.mjs'
import { detailsRoutes } from './routes/details-routes.mjs'
import { helpers } from './utils/handlebar-util.mjs'
import { sessionUserSettings } from './utils/session-middleware.index.mjs'
import {overrideMiddleware} from "./utils/method-override.mjs"; // Importing the overrideMiddleware from the './utils/method-override.mjs' file, which handles method overriding

export const app = express()
const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'default',
    helpers: {
        ...helpers,
    },
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.resolve('views'))

app.use(express.static(path.resolve('public')))
app.use(
    session({
        secret: 'casduichasidbnuwezrfinasdcvjkadfhsuilfuzihfioda',
        resave: false,
        saveUninitialized: true,
    })
)
app.use(sessionUserSettings)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(overrideMiddleware); // Using the overrideMiddleware for handling method overriding

app.use('/', indexRoutes)
app.use('/details', detailsRoutes)
