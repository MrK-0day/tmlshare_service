import { map } from 'lodash'
import express from 'express'
import multer from 'multer'
import fs from 'fs-extra'
import qr from 'qr-image'
import SHA512 from 'crypto-js/sha512'

import { API } from '../../config'

const Upload = express.Router()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

Upload.post(`/uploads`, multer({ storage: storage }).array('file', 20), async (req, res) => {
  // console.log(req.files)
  let files = map(req.files, (file) => {
    return { url: `${API.HOST}/static/ios/${file.filename}` }
  })
  let qr_png = qr.image(JSON.stringify(files), { type: 'png', ec_level: 'H', margin: 1, parse_url: true })
  qr_png.pipe(fs.createWriteStream(`uploads_qr/${SHA512(JSON.stringify(files)).toString()}.png`))
  res.json({qr_image: `${API.HOST}/static/images/${SHA512(JSON.stringify(files)).toString()}.png`})
})

export { Upload }
