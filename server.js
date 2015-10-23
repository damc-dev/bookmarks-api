exports.start = function() {
  var restify = require('restify');
  var envConfig = require('./config/envConfig');

  var bunyan = require('bunyan');
  var logConfig = require('./config/logConfig')(envConfig.logLevel, restify.bunyan.serializers);
  var log = bunyan.createLogger(logConfig.mainLogger);
  var accessLog = bunyan.createLogger(logConfig.accessLogger)

  var tokenConfig = require('./config/tokenConfig');
  var appConfig = require('./config/appConfig');
  var server = restify.createServer({
    name: appConfig.name,
    version: appConfig.version,
    log: accessLog
  });

  var saveConfig = require('./config/saveConfig')(log, {engine: undefined, debug: true});
  var bookmarkService = require('save')('bookmark', saveConfig);
  var handler = require('./handlers/bookmark_handler')(bookmarkService, {logger: log});

  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.queryParser());
  server.use(restify.bodyParser());

  server.pre(function (req, res, next) {
    req.log.info({req: req}, 'START');
    return next();
  });

  server.get('/user/:userId', function (req, res, next) {
    res.send({code: 200, message: req.params});
    return next();
  });

  server.get('api/health', function (req, res, next) {
    res.send({code: 200, message: "OK"});
    return next();
  });

  function authorizedUser(req, res, next) {
    if(req.headers['x-authorized-user-id']) {
      next();
    } else {
      return next(new restify.InvalidArgumentError("Missing required header x-authorized-user-id"));
    }
  }

  server.get('/api/bookmark', authorizedUser, handler.list);
  server.post('/api/bookmark', authorizedUser, handler.create);

  server.get('/api/bookmark/:id', authorizedUser, handler.find);
  server.put('/api/bookmark/:id', authorizedUser, handler.update);
  server.del('/api/bookmark/:id', authorizedUser, handler.delete);

  server.listen(appConfig.server_port, function () {
    log.info('%s listening at %s', server.name, server.url);
  });
};
