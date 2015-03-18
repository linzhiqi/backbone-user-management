var serverbone = require('serverbone');
var config = require('../config');
var passwordHash = require('password-hash');

var schema = {
  id: 'schema/user',
  type: 'object',
  properties: {
    id: {
      type: 'integer'
    },
    username: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    roles: {
      type: 'array',
      default: []
    }
  },
  defaultProjectionOptions: {
    projection: {
      onlyFields: ['id', 'username', 'roles']
    },
    recursive: true
  }
};

var User = serverbone.models.ACLModel.extend({
  schema: schema,
  type: 'user',
  db: config.store,
  sync: config.store.sync,
  /**
   * checkPassword
   *
   * This function should be implemented.
   * @returns {Boolean} true if password was correct, false if not
   */
  checkPassword: function(pwd) {
    if(!pwd) return false;
    var hashedPwd = this.get("password");
    return passwordHash.verify(pwd, hashedPwd);
  },

  save: function(key, val, options) {
    var plainPwd = this.get('password');
    try{
      var hashed = passwordHash.generate(plainPwd);
    } catch(err) {
      var errmsg = "invalid password";
      var options = {statusCode: 400, description: 'Bad Request'};
      var error = new serverbone.errors.BaseError(errmsg, options);
      return error;
    }   
    this.set('password', hashed);
    return User.__super__.save.call(this, key, val, options);
  },

  /**
   * addRoles
   *
   * This function should be implemented.
   *
   * Roles are unique, thus adding same role twice should not add it to roles twice.
   * Usage:
   * addRoles('a') -> adds role 'a'
   * addRoles('b', 'c') -> adds roles 'b' & 'c'
   * addRoles(['c', 'd', 'e']) -> adds roles 'd' & 'e'
   */
  addRoles: function(roles) {
    if(arguments.length>1) {
      roles = Array.prototype.slice.call(arguments);
    }
    User.__super__.addRoles.call(this,roles);
  }


});

module.exports = User;