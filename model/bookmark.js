var bookmarkSave = require('save')('bookmark')

exports.list = function (req, res, next) {
  bookmarkSave.find({}, function(error, bookmarks) {
    res.send(bookmarks);
  });
};

exports.create = function (req, res, next) {
  if (req.params.name === undefined) {
    return next(new restify.InvalidArgumentError('Name must be supplied'));
  } else if(req.params.type === undefined) {
    return next(new restify.InvalidArgumentError('Type must be supplied'));
  } else if(req.params.url === undefined) {
    return next(new restify.InvalidArgumentError('Url must be supplied'));
  }

  bookmarkSave.create(
    {name: req.params.name, type: req.params.type, url: req.params.url},
    function(error, bookmark) {
      if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
      res.send(201, bookmark);
  });
};

exports.find = function (req, res, next) {
  bookmarkSave.findOne({ _id: req.params.id }, function(error, bookmark) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));

    if(bookmark) {
      res.send(bookmark);
    } else {
      res.send(404);
    }
  });
};

exports.update = function (req, res, next) {
  bookmarkSave.update(
    { _id: req.params.id, name: req.params.name, type: req.params.type, url: req.params.url},
    function(error, bookmark) {
      if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
      res.send();
    });
};

exports.delete = function (req, res, next) {
  bookmarkSave.delete(req.params.id, function(error, bookmark) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
    res.send();
  });
};
