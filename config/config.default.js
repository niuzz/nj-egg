'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1519043386173_820';

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/nj_shopping',
    options: {
      useMongoClient: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  };

  config.jwt = {
    secret: 'NJason39A',
    enable: true, // default is false
    match: '/jwt', // optional
  };

  // add your config here
  config.middleware = [ 'errorHandler' ];

  return config;
};
