exports.start = function() {
  var restify = require('restify');
  var bookmark = require('./model/bookmark')
  var log = require('./lib/log');
  var tokenConfig = require('./config/tokenConfig');
  var appConfig = require('./config/appConfig');
  var server = restify.createServer({
    name: appConfig.name,
    version: appConfig.version,
    log: log
  });

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

  server.get('/api/bookmark', authorizedUser, bookmark.list);
  server.post('/api/bookmark', authorizedUser, bookmark.create);

  server.get('/api/bookmark/:id', authorizedUser, bookmark.find);
  server.put('/api/bookmark/:id', authorizedUser, bookmark.update);
  server.del('/api/bookmark/:id', authorizedUser, bookmark.delete);

  server.listen(appConfig.server_port, function () {
    log.info('%s listening at %s', server.name, server.url);
  });
};
