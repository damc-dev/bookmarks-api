var client = restify.createJsonClient({
    version: '*',
    url: 'http://127.0.0.1:8080'
});


describe('service bookmark: ', function() {

    describe('get bookmark where bookmark doesnt exist', function() {
        it('should get a 404 response', function(done) {
            client.get('/bookmark/1', function(err, req, res, data) {
                if(err) {
                  if(err.statusCode != 404) {
                      throw new Error('/bookmark/1 should throw 404 error');
                  }
                  done();
                } else {
                  throw new Error('/bookmark/1 should throw 404 error');
                }
            });
        });
    });

    describe('create bookmark', function(){
      it('should return 201', function(done) {
        client.post('/bookmark',
          {name: 'dmcelligott.com', type: 'url', url: 'http://dmcelligott.com'},
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
      it('should return the created bookmark', function(done) {
        client.post('/bookmark',
          {name: 'dmcelligott.com', type: 'url', url: 'http://dmcelligott.com'},
          function(err, req, res, obj) {
            assert.equal('dmcelligott.com', obj.name);
            assert.equal('url', obj.type);
            assert.equal('http://dmcelligott.com', obj.url);
            done();
          });
      });
    });

    describe('update bookmark', function() {
      before(function() {
        client.post('/bookmark',
          {name: 'dmcelligott.com', type: 'url', url: 'http://dmcelligott.com'},
          function(err, req, res, data) {
            assert.equal('dmcelligott.com', data.name);
            assert.equal('url', data.type);
            assert.equal('http://dmcelligott.com', data.url);
          });
      });
      it('response should 200', function(done) {
          client.put('/bookmark/1',
          {name: 'My Website', type: 'url', url: 'http://dmcelligott.com'},
          function(err, req, res, obj) {
            assert.equal(200, res.statusCode);
            done();
          });
      });
      after(function() {
        client.get('/bookmark/1', function(err, req, res, data) {
          assert.equal('My Website', data.name);
          assert.equal('url', data.type);
          assert.equal('http://dmcelligott.com', data.url);
        });
      });
    });
});
