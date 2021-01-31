const express = require('express')

const defaultMapping = require('./../mappings/DefaultViewMapping')
const locationMapping = require('./../mappings/LocationViewMapping')
const browserMapping = require('./../mappings/BrowsingHistoryMapping')
const movieMapping = require('./../mappings/MovieViewMapping')

// eslint-disable-next-line import/order
const formatter = require('../logic/index')({ mappings: [movieMapping, locationMapping, browserMapping], default: defaultMapping })
const app = express()

app.get('/fetch', (req, res) => {
  formatter(require('./../data/data.json'), (result) => {
    res.json(result)
  })
})

module.exports = {
  path: '/api',
  handler: app
}
