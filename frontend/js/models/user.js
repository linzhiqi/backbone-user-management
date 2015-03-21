/*global Backbone */
var app = app || {};
(function () {
	'use strict';

	// User Model
	app.User = Backbone.Model.extend({
		defaults: {
			username: '',
			password: '',
			roles: []
		},
		url : function() {
		    // Important! It's got to know where to send its REST calls. 
		    var uri = '/users';
		    if(this.id){
		    	uri += '/'+this.id;
		    }
		    return "http://localhost:9999" + uri; 
		},
		validate: function (attrs) {
			var errors = [];
	        if (attrs.username && attrs.username.length>5) {
	            
	        }else {
	        	errors.push({attrName: 'username', message: 'Please fill username field at least 6 characters'});
	        }
	        if (attrs.password && attrs.password.length>7) {

	        }else {
	        	errors.push({attrName: 'password', message: 'Password has to be at least 8 characters'});
	        }
	        if (attrs.roles && attrs.roles.length>0) {
	            for(var i=0; i<attrs.roles.length; i++){
	        		var role = attrs.roles[i].trim();
	        		if(role.length===0){
	        			errors.push({attrName: 'roles', message: 'Role can not be blank'});
	        			break;
	        		}
	        	}
	        }else{
	        	errors.push({attrName: 'roles', message: 'Please fill roles, delimited by comma'});
	        }
	        return errors.length > 0 ? errors : false;
    	}
	});
})();
