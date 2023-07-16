import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import session from 'express-session'
import exphbs from 'express-handlebars'

import { indexRoutes } from './routes/index-routes.mjs'
import { detailsRoutes } from './routes/details-routes.mjs'
import { helpers } from './utils/helper/handlebar-util.mjs'
import { sessionUserSettings } from './utils/middleware/session-middleware.mjs'
import { overrideMiddleware } from './utils/middleware/method-override-middleware.mjs'
import { notFound } from './utils/middleware/not-found-middleware.mjs'
import { errorHandler } from './utils/middleware/error-handler-middleware.mjs'

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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(sessionUserSettings)
app.use(overrideMiddleware)

app.use('/', indexRoutes)
app.use('/details', detailsRoutes)
app.use(notFound)
app.use(errorHandler)
