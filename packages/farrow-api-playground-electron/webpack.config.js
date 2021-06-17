const electronConfiguration = require('./webpack.electron')
const reactConfiguration = require('./webpack.react')

module.exports = [electronConfiguration, reactConfiguration]
