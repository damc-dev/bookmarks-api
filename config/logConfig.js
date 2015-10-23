var config = function(logLevel, serializers) {

  function getStreams(fileStream) {
    streams = [fileStream];
    if (process.env.NODE_ENV !== 'test') {
      streams.push({
        stream: process.stdout,
        level: logLevel
      });
    }
    return streams;
  }

  return {
    accessLogger: {
      name: 'bookmarks-api-access',
        streams: getStreams ({
          type: 'rotating-file',
          path: "access.log",
          period: '1d',   // daily rotation
          count: 4        // keep 3 back copies
        }),
      serializers: serializers
    }, mainLogger: {
      name: 'bookmarks-api',
        streams: getStreams({
          type: 'rotating-file',
          path: "bookmarks-api.log",
          period: '1d',   // daily rotation
          count: 4        // keep 3 back copies
        }),
      serializers: serializers
    }
  };
};
module.exports = config;
