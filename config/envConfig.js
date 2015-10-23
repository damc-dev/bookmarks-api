var envConfig = function() {

  switch(process.env.NODE_ENV) {
    case 'test':
      return {
        logLevel: process.env.LOG_LEVEL || debug,
        saveEngine: undefined
      };
    case 'development':
      return {
        logLevel: process.env.LOG_LEVEL || debug,
        saveEngine: undefined
      };
    case 'production':
      return {
        logLevel: process.env.LOG_LEVEL || info,
        saveEngine: require('mongodb-engine')
      };
    default:
      return {
        logLevel: process.env.LOG_LEVEL || info,
        saveEngine: undefined
      };
  }
};

module.exports = envConfig;
