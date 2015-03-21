var should = chai.should();
var expect = chai.expect;
describe("Application", function() {
	it("creates a global variable 'app' for the name space", function () {
		should.exist(app);
	})
})