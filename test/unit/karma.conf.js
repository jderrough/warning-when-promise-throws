// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack
var grep = require('karma-webpack-grep')
var webpackConfig = require('../../config/webpack.test.conf')

module.exports = function(config) {
  webpackConfig.plugins = (webpackConfig.plugins || []).concat(
    grep({
      grep: config.grep || parseTestPattern(process.argv),
      // same baseDir as used in karma conf
      baseDir: 'test/unit/',
      // same string as used in `require.ensure`
      // in your main test file
      // see https://github.com/webpack/karma-webpack#alternative-usage
      testContext: './specs'
    })
  )
  config.set({

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'mocha',
      'chai-as-promised',
      'chai',
      'phantomjs-shim'
    ],

    client: {
      chai: {
        includeStack: true
      }
    },

    reporters: ['spec', 'coverage'],

    files: [
      '../../node_modules/babel-polyfill/dist/polyfill.js',
      './index.js'
    ],

    preprocessors: {
      './index.js': ['webpack', 'sourcemap'],
      [require.resolve('chai-as-promised')]: ['webpack']
    },

    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },

    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}

function parseTestPattern (argv) {
  var found = false
  var pattern = argv.map(function (v) {
    if (found) {
      return v
    }
    if (v === '--') {
      found = true
    }
  })
    .filter(function (a) { return a })
    .join(' ')
  return pattern
}
