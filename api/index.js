const express = require('express')

const defaultMapping = require('./../mappings/DefaultViewMapping')
const locationMapping = require('./../mappings/LocationViewMapping')
const browserMapping = require('./../mappings/BrowsingHistoryMapping')
const movieMapping = require('./../mappings/MovieViewMapping')

// eslint-disable-next-line import/order
const formatter = require('../logic/index')({ mappings: [movieMapping, locationMapping, browserMapping], default: defaultMapping })
const app = express()

app.get('/fetch', (req, res) => {
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

module.exports = {
  path: '/api',
  handler: app
}
