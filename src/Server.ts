import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import path from 'path'
import helmet from 'helmet'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import StatusCodes from 'http-status-codes'
import 'express-async-errors'

import BaseRouter from './routes'
import logger from '@shared/Logger'

const app = express()
const { BAD_REQUEST } = StatusCodes

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

//Add the powered by header
app.use((req, res, next) => {
  res.removeHeader('x-powered-by')
  res.append('X-Powered-By', 'lolo Engine')
  res.append('Made-By', 'saiid')
  next()
})
//options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Token',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,OPTIONS,POST,DELETE',
  preflightContinue: true,
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}

app.use(cors(options))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Securityapp.use(express.json())

if (process.env.NODE_ENV === 'production') {
  app.use(helmet())
}

// Add APIs
app.use('/api', BaseRouter)

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.err(err, true)
  return res.status(BAD_REQUEST).json({
    error: err.message,
  })
})

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, 'views')
app.set('views', viewsDir)
const staticDir = path.join(__dirname, 'views', 'build')
app.use(express.static(staticDir))
app.get('/', (req: Request, res: Response) => {
  res.sendFile('/build/index.html', { root: viewsDir })
})

// Export express instance
export default app
