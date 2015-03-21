describe("User View", function() {
	var user = new app.User({
				id: 0,
				username: "nameee",
				password: "supersecret",
				roles: ["admin"]
			});
	var item = new app.UserView({model: user});
	describe("basic structure", function() {	
		it("render() should return the view object", function() {
			item.render().should.equal(item);

		})
		it("should render as a td tag", function() {
			item.render().el.nodeName.should.equal("TR");
		})
		it("should render with id as the model's id attribute", function() {
			item.render().$el.attr('id').should.equal("user-id-0");
		})

	})

	describe("when edit button is clicked", function() {
		beforeEach(function(){
			item.render();
			item.$el.find(".edit-user").click();
		})
		
		it("edit button should be hidden", function() {
			item.$el.find(".edit-user").css('display').should.equal('none');
		})
		it("update button should be shown", function() {
			item.$el.find(".update-user").css('display').should.not.equal('none');
		})
		it("cancel button should be shown", function() {
			item.$el.find(".cancel").css('display').should.not.equal('none');
		})
	})

	describe("when cancel button is clicked", function() {
		beforeEach(function(){
			item.render();
			item.$el.find(".edit-user").click();
			item.$el.find(".cancel").click();
		})
		

		it("edit button should be shown", function() {
			item.$el.find(".edit-user").css('display').should.not.equal('none');
		})
		it("update button should be hidden", function() {
			item.$el.find(".update-user").css('display').should.equal('none');
		})
		it("cancel button should be hidden", function() {
			item.$el.find(".cancel").css('display').should.equal('none');
		})
	})
})

