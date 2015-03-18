var models = require('../models');
var collections = require('../collections');
var should = require('chai').should();
var serverbone = require('serverbone');
var assert = require('chai').assert;

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

  it('should add roles to User', function() {
    var usr = new models.User();
    usr.addRoles('a');
    usr.roles.length.should.equal(1);
    usr.roles.should.contain('a');
    usr.addRoles('a', 'b');
    usr.roles.length.should.equal(2);
    usr.roles.should.contain('b');
    usr.addRoles(['c', 'd']);
    usr.roles.length.should.equal(4);
    usr.roles.should.contain('d');
  });

  it('create user with existed username should return 409 Conflict error', function() {
    var users = new collections.Users();
    users.create({
      username: 'foouser', 
      password: 'supersecRet',
      description: 'hello world'
    }, null)
    .then(function(model){
      assert.ok(false, 'should not succeed');
    }, function(err){
      err.should.to.be.an.instanceof(serverbone.errors.BaseError);
    });
  });

  it('create user with new username should succeed', function() {
    var users = new collections.Users();
     users.create({
      username: 'foouser1', 
      password: 'supersecRet',
      description: 'hello world'
    }, null)
    .then(function(model){
      assert.ok(true, 'should succeed');
      users.length.should.equal(2);
    }, function(err){
      assert.ok(false, 'should not fail');
    });
  });

});
