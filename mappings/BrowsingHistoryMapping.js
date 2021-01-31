module.exports = {
  dataType: { key: 'data', value: 'http://www.specialprivacy.eu/vocabs/data#OnlineActivity' },
  componentName: 'PBrowsingHistoryView',
  requirements: {
    url: {
      type: String
    },
    timestamp: {
      type: Number
    },
    user_agent: {
      type: String
    },
    ip_address: {
      type: String
    }
  }
}
