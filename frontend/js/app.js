/*global $ */
var app = app || {};

$(function () {
	'use strict';
	app.createUserView = new app.CreateUserView();
	app.usersView = new app.UsersView();

// 	$(document).ready(function() {
// 	$('#addUserBtn').on('click', function() {
// 		var username1 = $('#username').val().trim();
// 		var password1 = $('#pwd').val().trim();
// 		var roles1 = $('#roles').val().split(',').map(Function.prototype.call, String.prototype.trim);
// 		console.log(JSON.stringify(roles1));
// 		var user = new app.User({
// 			username: username1,
// 			password: password1,
// 			roles: roles1
// 		});
// 		console.log(JSON.stringify(user));
// 		$('#username').val('');
// 		$('#pwd').val('');
// 		$('#roles').val('');
// 		app.users.add(user);
// 		user.on("invalid", function(model, error){
// 			alert(error);
// 		});
// 		var me = this;
// 		var options = {
// 		    success: function () {
// 		        me.hideErrors();
// 		    },
// 		    error: function (model, errors) {
// 		        me.showErrors(errors);
// 		    }
// 		};
// 		user.save(null, {
// 			success: function(response) {
// 				console.log('Successfully SAVED user: ' + response.toJSON());
// 			},
// 			error: function() {
// 				console.log('Failed to save user!');
// 			}
// 		});
// 	});
// })
});

