var models = require('../models');
var collections = require('../collections');
var should = require('chai').should();
var serverbone = require('serverbone');

describe('User tests', function() {
  var user;

  it('should save a User', function() {
    user = new models.User({
      username: 'foouser',
      password: 'supersecRet',
      description: 'hello world'
    });
    return user.save();
  });

  it('should throw 400 Bad Request error', function() {
    var user = new models.User({
      username: 'foouser1',
      description: 'hello world'
    });
    user.save().should.to.be.an.instanceof(serverbone.errors.BaseError);
  });

  it('plaintext password should not be saved', function() {
    return user
      .fetch()
      .then(function() {
        user.get('password').should.not.equal('supersecRet');
      });
  });

  it('password should hashed correctly and should be validated correctly', function() {
    return user
      .fetch()
      .then(function() {
        user.checkPassword('supersecRet').should.to.be.true;
      })
      .then(function() {
        user.checkPassword('supersecRetnot').should.to.be.false;
      });
  });

  it('should list users', function() {
    var users = new collections.Users();
    return users
      .fetch()
      .then(function() {
        users.length.should.equal(1);
      });
  });
});
