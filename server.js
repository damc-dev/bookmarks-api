exports.start = function() {
var restify = require('restify');
var bookmark = require('./model/bookmark')

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

server.get('/bookmark', bookmark.list);
server.post('/bookmark', bookmark.create);

server.get('/bookmark/:bookmarkId', bookmark.find);
server.put('/bookmark/:bookmarkId', bookmark.update);
server.del('/bookmark/:bookmarkId', bookmark.delete);

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
};
