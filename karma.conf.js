module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/**/*.test.js'
    ],
    preprocessors: {
      'src/**/*.test.js': ['webpack']
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          }
        ]
      }
    },
    reporters: ['progress'],
    browsers: ['Chrome'],
    singleRun: false,
    autoWatch: true
  });
};
