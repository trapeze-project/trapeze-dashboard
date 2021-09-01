const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const defaultMapping = require('./../mappings/DefaultViewMapping')
const locationMapping = require('./../mappings/LocationViewMapping')
const browserMapping = require('./../mappings/BrowsingHistoryMapping')
const movieMapping = require('./../mappings/MovieViewMapping')

// eslint-disable-next-line import/order
const formatter = require('../logic/index')({ mappings: [movieMapping, locationMapping, browserMapping], default: defaultMapping })
const app = express()
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/fetch', (req, res) => {
  // TODO: ADD TO TRANSLATION
  if (req.query.original === 'true') {
    return res.json(require('./../data/data.json'))
  }
  formatter(require('./../data/data.json'), (result) => {
    res.json(result)
  })
})

app.get('/permissions', (req, res) => {
  res.json(require('./../data/permission.json'))
})

app.get('/profile', (req, res) => {
  res.json(require('./../data/profile.json'))
})

app.get('/setup', (req, res) => {
  res.json(require('./../design/design.config.json'))
})

app.put('/setup', (req, res) => {
  // eslint-disable-next-line no-console
  console.log(__dirname)
  const desingPath = path.join(__dirname, '..', 'design', 'design.config.json')
  // eslint-disable-next-line no-console
  console.log(desingPath)
  const data = JSON.stringify(req.body, null, 2)
  fs.writeFile(desingPath, data, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err)
      return res.status(400).send(err)
    }
    return res.status(200).send('succes')
  })
})

module.exports = {
  path: '/api',
  handler: app
}
