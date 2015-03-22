describe("Create User View", function() {
	var view;
	describe("basic structure", function(){
		beforeEach(function(){
			sinon.spy(app.User.prototype, "save");
			sinon.spy(app.CreateUserView.prototype, "createNewUser");
			sinon.spy(app.CreateUserView.prototype, "clearHelpBlock");
			view = new app.CreateUserView();
			view.render();
		})
		afterEach(function() {
			app.User.prototype.save.restore();
			app.CreateUserView.prototype.createNewUser.restore();
			app.CreateUserView.prototype.clearHelpBlock.restore();
		})
		it("render() should return the view object", function() {
	    	view.render().should.equal(view);
	  	})
		it("should render as a div tag", function(){	
			view.el.nodeName.should.equal("DIV");
		})
		it("should contain a form tag with a button", function(){	
			view.$el.find('form.form-horizontal').length.should.equal(1);
			view.$el.find('button#addUserBtn').length.should.equal(1);
		})
		it("should trigger the save() after the button is clicked", function(){
			view.$el.find('button#addUserBtn').click();
			app.User.prototype.save.should.have.been.calledOnce;
		})
		it("should trigger the createNewUser() and clearHelpBlock() after the button is clicked", function(){
			view.$el.find('button#addUserBtn').click();
			app.CreateUserView.prototype.createNewUser.should.have.been.calledOnce;
			app.CreateUserView.prototype.clearHelpBlock.should.have.been.calledOnce;
		})
	})
	describe("correct input", function(){
		var view, server, responseBody;
		before(function(){
			server = sinon.fakeServer.create();
			responseBody = '{"id": 1,"username": "nameee","roles": ["admin","ceo"]}';
			server.respondWith(
				"POST",
				app.User.prototype.url(),
				[
					200,
					{
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
						"Content-Length": 55
					},
					responseBody
				]
			);
			sinon.spy(app.CreateUserView.prototype, "hideErrors");
			view = new app.CreateUserView();
			view.render();
			view.$el.find('input#username').val("nameee");
			view.$el.find('input#password').val("supersecret");
			view.$el.find('input#roles').val("admin,ceo");
			view.$el.find('button#addUserBtn').click();
		})	
		after(function(){
			app.CreateUserView.prototype.hideErrors.restore();
			server.restore();
		})

		it("should trigger hideErrors()", function(){
			server.requests[0].method.should.equal("POST");
			server.respond();
			app.CreateUserView.prototype.hideErrors.should.have.been.calledOnce;
		})
	})
})