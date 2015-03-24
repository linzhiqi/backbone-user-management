/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};
(function ($) {
	'use strict';

	app.CreateUserView = Backbone.View.extend({
		events: {
			'click #addUserBtn': 'createNewUser'
		},
		initialize: function(){
			this.element = '<form class="form-horizontal" role="form">'
				+	'<div class="form-group username">'
				+		'<label class="control-label col-sm-offset-2 col-sm-2" for="username">Name:</label>'
				+		'<div class="col-sm-5">'
				+			'<input type="text" class="form-control" id="username" placeholder="Enter username">'
				+		'</div>'
				+	'</div>'
				+	'<div class="form-group password">'
				+		'<label class="control-label col-sm-offset-2 col-sm-2" for="password">Password:</label>'
				+		'<div class="col-sm-5">'
				+			'<input type="password" class="form-control" id="password" placeholder="Enter password">'
				+		'</div>'
				+	'</div>'
				+	'<div class="form-group roles">'
				+		'<label class="control-label col-sm-offset-2 col-sm-2" for="roles">Role(s):</label>'
				+		'<div class="col-sm-5">'
				+			'<input type="text" class="form-control" id="roles" placeholder="Enter role1,role2,...">'
				+		'</div>'
				+	'</div>'
				+	'<button id="addUserBtn" type="submit" class="btn btn-primary">Create the user</button>'
				+'</form>';
			this.render();
		},
		render: function(){
			$('.jumbotron').find('h1').after(this.$el);
			this.$el.html(this.element);
			return this;
		},
		createNewUser: function(e) {
			e.preventDefault();
			this.clearHelpBlock();
			var username = this.$el.find('#username').val().trim();
			var password = this.$el.find('#password').val().trim();
			var roles = this.$el.find('#roles').val().split(',').map(Function.prototype.call, String.prototype.trim);
			this.model = new app.User({
				username: username,
				password: password,
				roles: roles
			});
			var me = this;
			var options = {
			    success: function (model) {
			    	app.users.add(model,{justAdded: true});
			        me.$el.find('#username').val('');
					me.$el.find('#password').val('');
					me.$el.find('#roles').val('');
					me.hideErrors();
			    },
			    error: function (model, response) {
			    	me.showErrors([{attrName: 'other', message: jQuery.parseJSON(response['responseText']).error}]);
			    }
			};
			this.model.on("invalid", function(model, errors) {
			    me.showErrors(errors);
			});
			this.model.save(null, options);
		},
		showErrors: function(errors) {
			_.each(errors, function (error) {
				var controlGroup = this.$('.form-group.' + error.attrName);
				if(this.$('.form-group.' + error.attrName).length===0) {
					this.$el.find('#addUserBtn').before('<p class="help-block has-error"><small>'+error.message+'</small></p>');
				}else {
					controlGroup.find('div').after('<p class="help-block"><small>'+error.message+'</small></p>');
					controlGroup.addClass('has-error');
				}
				
			}, this);
		},	 
		hideErrors: function () {
			this.$el.find('.help-block').remove();
			this.$el.find('.form-group').removeClass('has-error');
		},
		clearHelpBlock: function() {
			this.$el.find('.help-block').remove();
			this.$el.find('.form-group').removeClass('has-error');
		},
	});
})(jQuery);