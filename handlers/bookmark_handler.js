var BookmarkHandlerFactory = function(service, config) {
  var _service = service;
  var _logger = config.logger;

  return {
    list: function(req, res, next) {
      _service.find({userId: req.headers['x-authorized-user-id']}, function(error, bookmarks) {
        res.send(bookmarks);
      });
    },
    create: function(req, res, next) {
      if (req.params.name === undefined) {
        return next(new restify.InvalidArgumentError('Name must be supplied'));
      } else if(req.params.type === undefined) {
        return next(new restify.InvalidArgumentError('Type must be supplied'));
      } else if(req.params.url === undefined) {
        return next(new restify.InvalidArgumentError('Url must be supplied'));
      }

      _service.create(
        {userId: req.headers['x-authorized-user-id'], name: req.params.name, type: req.params.type, url: req.params.url, tags: req.params.tags},
        function(error, bookmark) {
          if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
          res.send(201, bookmark);
      });
    },
    find: function(req, res, next) {
      _service.findOne({ userId: req.headers['x-authorized-user-id'], _id: req.params.id }, function(error, bookmark) {
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));

        if(bookmark) {
          res.send(bookmark);
        } else {
          res.send(404);
        }
      });
    },
    update: function(req, res, next) {
      _service.findOne({userId: req.headers['x-authorized-user-id'], _id: req.params.id}, function(error, bookmark) {
        if(error) {
          log.error(error);
          return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
        } else if(!bookmark) {
          res.end(401, {code: 'UnauthorizedAction', message: 'You are not authorized to modify this record'});
        }
      });
    _service.update(
      { userId: req.headers['x-authorized-user-id'], _id: req.params.id, name: req.params.name, type: req.params.type, url: req.params.url, tags: req.params.tags},
      function(error, bookmark) {
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
        res.send();
      });
    },
    delete: function(req, res, next) {
      _service.findOne({userId: req.headers['x-authorized-user-id'], _id: req.params.id}, function(error, bookmark) {
        if(error) {
          log.error(error);
          return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
        } else if(!bookmark) {
          res.end(401, {code: 'UnauthorizedAction', message: 'You are not authorized to modify this record'});
        }
      });
    _service.delete(req.params.id, function(error, bookmark) {
      if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
      res.send();
    });
    }
  }
}

module.exports = BookmarkHandlerFactory;
