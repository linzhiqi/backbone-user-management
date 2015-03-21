/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	app.UsersView = Backbone.View.extend({
		tagName: 'tbody',
		collection: app.users,

		initialize: function () {
			this.collection.on('add', this.addHandler, this);
			this.collection.fetch([
				{
					//add: false
				},
				{
					success: function(data) {
						_.each(data.toJSON(), function(item){
							//console.log('Got user' + JSON.stringify(item));
						})
					},
					error: function() {
						alert('Failed to get data from Backend!');
					}
				}
			]);
		},
		render: function () {
			var self = this;
			$('table').find('thead').after(this.$el);
			$(this.el).empty();
			_.each(this.collection.toArray(), function(item){
				$(self.el).prepend((new app.UserView({model: item})).render().$el);
			});
			return this;
		},
		addHandler: function(model, collection, options) {
			this.render();
			if(options.justAdded){
					var targetElement = this.$el.find('#user-id-'+model.id);
				targetElement.animate({
					backgroundColor: '#AAD023',
				},500).animate({
					backgroundColor: '#fff',
				},500).animate({
					backgroundColor: '#AAD023',
				},500).animate({
					backgroundColor: '#fff',
				},500);
			}
		}
	});
})(jQuery);