exports.start = function() {
  var restify = require('restify');
  var bookmark = require('./model/bookmark')
  var log = require('./lib/log');
  var server = restify.createServer({
    name: 'bookmarks-api',
    version: '1.0.0',
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

  server.get('/bookmark', bookmark.list);
  server.post('/bookmark', bookmark.create);

  server.get('/bookmark/:id', bookmark.find);
  server.put('/bookmark/:id', bookmark.update);
  server.del('/bookmark/:id', bookmark.delete);

  server.listen(8080, function () {
    log.info('%s listening at %s', server.name, server.url);
  });
};
