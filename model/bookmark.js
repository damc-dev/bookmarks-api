var log         = require('../lib/log');
var bookmarkSave = require('save')('bookmark', require('../config/saveConfig'));

exports.list = function (req, res, next) {
  bookmarkSave.find({userId: req.user._id}, function(error, bookmarks) {
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
    {userId: req.user._id, name: req.params.name, type: req.params.type, url: req.params.url},
    function(error, bookmark) {
      if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
      res.send(201, bookmark);
  });
};

exports.find = function (req, res, next) {
  bookmarkSave.findOne({ userId: req.user._id, _id: req.params.id }, function(error, bookmark) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));

    if(bookmark) {
      res.send(bookmark);
    } else {
      res.send(404);
    }
  });
};

exports.update = function (req, res, next) {
  if(!req.user.admin) {
    bookMarkSave.findOne({userId: req.user._id, _id: req.params.id}, function(error, bookmark) {
      if(err) {
        log.error(err);
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
      } else if(!bookmark) {
        res.end(401, {code: 'UnauthorizedAction', message: 'You are not authorized to modify this record'});
      }
    });
  }
  bookmarkSave.update(
    { userId: req.user._id, _id: req.params.id, name: req.params.name, type: req.params.type, url: req.params.url},
    function(error, bookmark) {
      if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
      res.send();
    });
};

exports.delete = function (req, res, next) {
  if(!req.user.admin) {
    bookMarkSave.findOne({userId: req.user._id, _id: req.params.id}, function(error, bookmark) {
      if(err) {
        log.error(err);
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
      } else if(!bookmark) {
        res.end(401, {code: 'UnauthorizedAction', message: 'You are not authorized to modify this record'});
      }
    });
  }
  bookmarkSave.delete(req.params.id, function(error, bookmark) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
    res.send();
  });
};
