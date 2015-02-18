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

  server.get('/api/bookmark', bookmark.list);
  server.post('/api/bookmark', bookmark.create);

  server.get('/api/bookmark/:id', bookmark.find);
  server.put('/api/bookmark/:id', bookmark.update);
  server.del('/api/bookmark/:id', bookmark.delete);

  server.listen(8088, function () {
    log.info('%s listening at %s', server.name, server.url);
  });
};
