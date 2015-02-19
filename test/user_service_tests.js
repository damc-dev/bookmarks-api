var client = restify.createJsonClient({
    version: '*',
    url: 'http://127.0.0.1:8080',
    headers: { 'x-authorized-user-id':'1'}
});


describe('service: user', function() {

    describe('200 response check', function() {
        it('should get a 200 response', function(done) {
            client.get('/user/1', function(err, req, res, data) {
                if(err) {
                    throw new Error(err);
                } else {
                    if(data.code != 200) {
                        throw new Error('invalid response from /user/1');
                    }
                    done();
                }
            });

        });

    });

});
