const webpackConfig = require('./karma.webpack.config');
const TEST_AUTO = process.env.TEST_AUTO;

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: ['test/**/*.ts', 'test/**/*.js'],
        exclude: [],

        // Available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test/**/*.ts': ['webpack'],
            'test/**/*.js': ['webpack'],
        },
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve,
            mode: webpackConfig.mode
        },

        // For enhancing the test results
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['spec'],
        // Web server port
        port: 9876,

        // enable / disable colors (reporters and logs)
        colors: true,

        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        autoWatch: true,

        // Browsers to launch
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // If true, Karma captures browsers, runs the tests and exits
        singleRun: !TEST_AUTO,

        // Concurrency level
        // specifies how many browser can be started simultaneous
        concurrency: Infinity,
    });
};
