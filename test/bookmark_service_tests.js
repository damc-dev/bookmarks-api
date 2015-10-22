var appConfig = require('../config/appConfig');
var client = restify.createJsonClient({
    version: '*',
    url: 'http://127.0.0.1:' + appConfig.server_port,
    headers: { 'x-authorized-user-id':'1'}
});


describe('service bookmark: ', function() {

    describe('get bookmark where bookmark doesnt exist', function() {
        it('should get a 404 response code', function(done) {
            client.get('/api/bookmark/1', function(err, req, res, data) {
                if(err) {
                  if(err.statusCode != 404) {
                      throw new Error('/api/bookmark/1 should throw 404 error');
                  }
                  done();
                } else {
                  throw new Error('/api/bookmark/1 should throw 404 error');
                }
            });
        });
    });

    describe('create bookmark', function(){
      it('response code should be 201', function(done) {
        client.post('/api/bookmark',
          {name: 'dmcelligott.com', type: 'url', url: 'http://dmcelligott.com', tags: ['awesome']},
          function(err, req, res, obj) {
            if(err) {
                throw new Error(err);
            } else {
                if(res.statusCode != 201) {
                    throw new Error('invalid response from post /user');
                }
                done();
            }
            assert.equal(201, res.statusCode);
          });
      });
      it('get bookmark should return the created bookmark', function(done) {
        client.post('/api/bookmark',
        {name: 'dmcelligott.com', type: 'url', url: 'http://dmcelligott.com', tags: ['awesome']},
          function(err, req, res, data) {
            assert.equal('dmcelligott.com', data.name);
            assert.equal('url', data.type);
            assert.equal('http://dmcelligott.com', data.url);
            assert.include(data.tags, 'awesome', 'tags array contains "awesome"');
            done();
          });
      });
    });

    describe('update bookmark', function() {
      before('create bookmark', function() {
        client.post('/api/bookmark',
        {name: 'dmcelligott.com', type: 'url', url: 'http://dmcelligott.com', tags: ['awesome']},
          function(err, req, res, data) {
            assert.equal('dmcelligott.com', data.name);
            assert.equal('url', data.type);
            assert.equal('http://dmcelligott.com', data.url);
            assert.include(data.tags, 'awesome', 'tags array contains "awesome"');
          });
      });
      it('response code should be 200', function(done) {
          client.put('/api/bookmark/1',
          {name: 'My Website', type: 'url', url: 'http://dmcelligott.com', tags: ['awesome']},
          function(err, req, res, obj) {
            assert.equal(200, res.statusCode);
            done();
          });
      });
      it('get bookmark should return updated bookmark', function() {
        client.get('/api/bookmark/1', function(err, req, res, data) {
          assert.equal('My Website', data.name);
          assert.equal('url', data.type);
          assert.equal('http://dmcelligott.com', data.url);
          assert.include(data.tags, 'awesome', 'tags array contains "awesome"');
        });
      });
    });

    describe('delete bookmark', function() {
      before('create bookmark', function() {
        client.post('/api/bookmark',
        {name: 'dmcelligott.com', type: 'url', url: 'http://dmcelligott.com', tags: ['awesome']},
          function(err, req, res, data) {
            assert.equal('dmcelligott.com', data.name);
            assert.equal('url', data.type);
            assert.equal('http://dmcelligott.com', data.url);
            assert.include(data.tags, 'awesome', 'tags array contains "awesome"');
          });
      });
      it('response code should be 200', function(done) {
        client.del('/api/bookmark/1', function(err, req, res, data) {
          assert.equal(200, res.statusCode);
          done();
        });
      });
      it('get bookmark should return 404',function(done) {
        client.get('/api/bookmark/1', function(err, req, res, data) {
            if(err) {
              if(err.statusCode != 404) {
                  throw new Error('/api/bookmark/1 should throw 404 error');
              }
              done();
            } else {
              throw new Error('/api/bookmark/1 should throw 404 error');
            }
        });
      });
    });
});
