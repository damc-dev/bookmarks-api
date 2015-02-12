exports.start = function() {
  var restify = require('restify');
  var bookmark = require('./model/bookmark')
  var log = require('./lib/log');
  var jwt = require('restify-jwt');
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

  server.get('/bookmark', jwt({secret: tokenConfig.jwt_secret}), bookmark.list);
  server.post('/bookmark', jwt({secret: tokenConfig.jwt_secret}), bookmark.create);

  server.get('/bookmark/:id', jwt({secret: tokenConfig.jwt_secret}), bookmark.find);
  server.put('/bookmark/:id', jwt({secret: tokenConfig.jwt_secret}), bookmark.update);
  server.del('/bookmark/:id', jwt({secret: tokenConfig.jwt_secret}), bookmark.delete);

  server.listen(8080, function () {
    log.info('%s listening at %s', server.name, server.url);
  });
};
