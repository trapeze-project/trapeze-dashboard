module.exports = {
  dataType: { key: 'data', value: 'http://www.specialprivacy.eu/vocabs/data#Location' },
  componentName: 'PLocationView',
  requirements: {
    timestamp: {
      type: Number
    },
    lat: {
      type: Number
    },
    lon: {
      type: Number
    },
    address: {
      type: String
    }
  },
  res: {
    reverseGeoUrl: 'https://api.opencagedata.com/geocode/v1/json?q=$lat+$lng&key=',
    reverseGeoKey: '28527020d9ed4148b5e1947ffb676852'
  },
  computed: {
    address: (data, axios, res) => {
      /* let query = res.reverseGeoUrl
      query = query.replace('$lat', data.lat)
      query = query.replace('$lng', data.lon)
      query += res.reverseGeoKey
      const response = await axios.get(query)
      return response.data.results[0].formatted */
      return 'Mock Data 123'
    }
  }
}
