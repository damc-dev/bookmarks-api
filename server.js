exports.start = function() {
var restify = require('restify');

var server = restify.createServer({
  name: 'bookmarks-api',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/user/:userId', function (req, res, next) {
  res.send({code: 200, message: req.params});
  return next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
};
