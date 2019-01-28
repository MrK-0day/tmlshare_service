require('dotenv').config()
import path from 'path'
import express from 'express'
import compression from 'compression'
import cors from 'cors'

import { API } from './config'
import {  Upload } from './router'

const app = express()
app.use(compression())
app.use(cors())

app.all('/', (req, res, next) => {
  res.send('Fuck your bitch !!!')
  next()
})
app.use('/static/images', express.static(path.join(__dirname, 'uploads_qr')))
app.use('/static/ios', express.static(path.join(__dirname, 'uploads')))
app.use(`/${API.VERSION}`, Upload)

app.listen(process.env.PORT || 3001, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 3001}.`)
})