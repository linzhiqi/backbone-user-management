

describe("User model", function() {
	describe("url()", function() {
		it("should include id if id attribute is present", function () {
			var user = new app.User({
				id: 1,
				username: "myname",
				password: "supersecret",
				roles: ["admin"]
			});
			user.url().should.to.match(/users\/1$/);
		})
		it("should not include id if id attribute is not present", function () {
			var user = new app.User({
				username: "myname",
				password: "supersecret",
				roles: ["admin"]
			});
			user.url().should.to.match(/\/users$/);
		})
	})
	describe("validation", function() {
		it("correct attribute should not return error", function () {
			var user = new app.User();
			var ret = user.validate({
					username: "nameee",
					password: "supersecret",
					roles: ["admin","ceo"]
				});
			ret.should.be.false;
		})
		describe("username", function() {
			it("is required", function () {
				var user = new app.User();
				var ret = user.validate({
					password: "supersecret",
					roles: ["admin"]
				});
				ret.should.not.be.false;
				ret.length.should.to.equal(1);
				ret[0].attrName.should.to.equal('username');
			})
			it("can not be null", function () {
				var user = new app.User();
				var ret = user.validate({
					username: null,
					password: "supersecret",
					roles: ["admin"]
				});
				ret.should.not.be.false;
				ret.length.should.to.equal(1);
				ret[0].attrName.should.to.equal('username');
			})
			it("can not be undefined", function () {
				var user = new app.User();
				var ret = user.validate({
					username: undefined,
					password: "supersecret",
					roles: ["admin"]
				});
				ret.should.not.be.false;
				ret.length.should.to.equal(1);
				ret[0].attrName.should.to.equal('username');
			})
			it("has to be at least 6 characters", function () {
				var user = new app.User();
				var ret = user.validate({
					username: "namee",
					password: "supersecret",
					roles: ["admin"]
				});
				ret.should.not.be.false;
				ret.length.should.to.equal(1);
				ret[0].attrName.should.to.equal('username');
			})
		})
		describe("password", function() {
			it("is required", function () {
				var user = new app.User();
				var ret = user.validate({
					username: "nameee",
					roles: ["admin"]
				});
				ret.should.not.be.false;
				ret.length.should.to.equal(1);
				ret[0].attrName.should.to.equal('password');
			})
			it("can not be null", function () {
				var user = new app.User();
				var ret = user.validate({
					username: "nameee",
					password: null,
					roles: ["admin"]
				});
				ret.should.not.be.false;
				ret.length.should.to.equal(1);
				ret[0].attrName.should.to.equal('password');
			})
			it("can not be undefined", function () {
				var user = new app.User();
				var ret = user.validate({
					username: "nameee",
					password: undefined,
					roles: ["admin"]
				});
				ret.should.not.be.false;
				ret.length.should.to.equal(1);
				ret[0].attrName.should.to.equal('password');
			})
			it("has to be at least 8 characters", function () {
				var user = new app.User();
				var ret = user.validate({
					username: "nameee",
					password: "secrett",
					roles: ["admin"]
				});
				ret.should.not.be.false;
				ret.length.should.to.equal(1);
				ret[0].attrName.should.to.equal('password');
			})
		})
		describe("roles", function() {
			it("is required", function () {
				var user = new app.User();
				var ret = user.validate({
					username: "nameee",
					password: "supersecret"
				});
				ret.should.not.be.false;
				ret.length.should.to.equal(1);
				ret[0].attrName.should.to.equal('roles');
			})
			it("can not be null", function () {
				var user = new app.User();
				var ret = user.validate({
					username: "nameee",
					password: "supersecret",
					roles: null
				});
				ret.should.not.be.false;
				ret.length.should.to.equal(1);
				ret[0].attrName.should.to.equal('roles');
			})
			it("can not be undefined", function () {
				var user = new app.User();
				var ret = user.validate({
					username: "nameee",
					password: "supersecret",
					roles: undefined
				});
				ret.should.not.be.false;
				ret.length.should.to.equal(1);
				ret[0].attrName.should.to.equal('roles');
			})
			it("has to be at least 1 item", function () {
				var user = new app.User();
				var ret = user.validate({
					username: "nameee",
					password: "supersecret",
					roles: []
				});
				ret.should.not.be.false;
				ret.length.should.to.equal(1);
				ret[0].attrName.should.to.equal('roles');
			})
			it("must not have blank role", function () {
				var user = new app.User();
				var ret = user.validate({
					username: "nameee",
					password: "supersecret",
					roles: [""]
				});
				ret.should.not.be.false;
				ret.length.should.to.equal(1);
				ret[0].attrName.should.to.equal('roles');
				var ret1 = user.validate({
					username: "nameee",
					password: "supersecret",
					roles: ["  "]
				});
				ret1.should.not.be.false;
				ret1.length.should.to.equal(1);
				ret1[0].attrName.should.to.equal('roles');

			})
		})
	})
	describe("Persistence", function() {
		it("set() does not trigger save()", function() {
			var user = new app.User();
			var save_stub = sinon.stub(user, "save");
			user.set('password', 'supersecret');
			save_stub.callCount.should.equal(0);
			save_stub.restore();
		})
	})
})