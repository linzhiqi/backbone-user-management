/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// User Collection
	// ---------------
	app.Users = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.User,
		url : "http://localhost:9999/users"
	});

	// Create our global collection of **Todos**.
	app.users = new app.Users();
})();