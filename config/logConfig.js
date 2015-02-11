var config = {
      name: 'bookmarks-api',
      streams: [{
        type: 'rotating-file',
        path: "bookmarks-api.log",
        period: '1d',   // daily rotation
        count: 4        // keep 3 back copies
      }, {
        stream: process.stdout,
        level: 'warn'
      }
    ]
  };

module.exports = config;
