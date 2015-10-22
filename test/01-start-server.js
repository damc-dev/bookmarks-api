restify = require('restify');
chai = require('chai');
assert = chai.assert;


before(function(done) {
    require('../server').start();
    done();
});
