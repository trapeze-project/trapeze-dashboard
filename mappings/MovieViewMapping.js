module.exports = {
  dataType: { key: 'data', value: 'http://www.specialprivacy.eu/vocabs/data#AudiovisualActivity' },
  componentName: 'PMovieView',
  requirements: {
    thumbnail: {
      type: String
    },
    watched_on: {
      type: Number
    },
    movie_title: {
      type: String
    },
    movie_genre: {
      type: String
    },
    duration: {
      type: Number
    },
    language: {
      type: String
    },
    ip_address: {
      type: String
    }
  },
  res: {},
  computed: {
    thumbnail: (data, axios, res) => {
      return 'https://picsum.photos/id/11/500/300'
    }
  }
}
