var serverbone = require('serverbone');
var models = require('../models');
var config = require('../config');
var when = require('when');

var Users = serverbone.collections.ACLCollection.extend({
  type: 'users',
  model: models.User,
  db: config.store,
  sync: config.store.sync,
  create: function(data, options){
  	var self = this;
    var promise = when.promise(function(resolve, reject){
    	self.fetch()
    		.then(function(){
    			var usernameExisted = false;
			    var arrayLen = self.length;
			    for(var i=0; i<arrayLen; i++) {
			    	if(self.at(i).get('username')===data.username){
			    		usernameExisted = true;
			    		break;
			    	}
			    }
			    if(usernameExisted){
			    	var errmsg = "username "+data.username+" is already taken";
			    	var options = {statusCode: 409, description: 'Conflict'};
			    	var err = new serverbone.errors.BaseError(errmsg, options);
			    	reject(err);
			    }else {
			    	var model = Users.__super__.create.call(self, data, options);
			    	resolve(model);
			    }
    		});
    });
    return promise;
  }
});

module.exports = Users;