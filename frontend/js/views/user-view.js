/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};
(function ($) {
	'use strict';
	app.UserView = Backbone.View.extend({
		tagName: 'tr',
		// className: 'user-info',
		events: {
			'click .edit-user': 'edit',
			'click .update-user': 'update',
			'click .cancel': 'cancel'
		},
		initialize: function () {
			this.template = _.template('<td class="col-sm-3"><span class="username"><%= username %></span></td>'
				+'<td class="col-sm-3"><span class="password">********</span></td>'
				+'<td class="col-sm-3"><span class="roles"><%= roles %></span></td>'
				+'<td class="col-sm-3">'
				+'<button class="btn btn-warning edit-user">Edit</button>'
				+'<button class="btn btn-success update-user" style="display:none">Update</button>'
				+'<button class="btn btn-danger cancel" style="display:none">Cancel</button>'
			);
		},
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.attr('id','user-id-'+this.model.id);
			return this;
		},
		edit: function() {
			this.$('.edit-user').hide();
			this.$('.update-user').show();
			this.$('.cancel').show();

			var username = this.$('.username').html();
			var password = '';
			var roles = this.$('.roles').html();

			this.$('.username').html('<input type="text" class="form-control username-update" value="' + username + '">');
			this.$('.password').html('<input type="text" class="form-control password-update" placeholder="enter new password">');
			this.$('.roles').html('<input type="text" class="form-control roles-update" value="' + roles + '">');
		},
		update: function() {
			//todo
			alert("update tbd");
		},
		cancel: function() {
			this.render();
		}
	});
})(jQuery);