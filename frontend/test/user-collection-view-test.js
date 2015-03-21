describe("User List View", function() {
  beforeEach(function(){
    this.user1 = new app.User({
      id: 1,
      username: "nameee",
      password: "supersecret",
      roles: ["admin"]
    });
    this.user2 = new app.User({
      id: 2,
      username: "nameee2",
      password: "supersecret",
      roles: ["admin"]
    });
    this.users = new app.Users([this.user1, this.user2]);
    // another way of spying on method
    this.fetch_stub = sinon.stub(this.users, "fetch");
    // must spy on the prototype, before the list is instantiated
    // for my own method, spy on instance does not work, don't know why
    sinon.spy(app.UsersView.prototype, "addHandler");
    this.list = new app.UsersView({collection: this.users});
  })
  afterEach(function() {
    app.UsersView.prototype.addHandler.restore();
    this.fetch_stub.restore();
  })
  it("render() should return the view object", function() {
    this.list.render().should.equal(this.list);
  })
  it("should render as a tbody tag", function() {
    this.list.render().el.nodeName.should.equal("TBODY");
  })
  it("should include list items for all models in collection", function() {
    this.list.render();
    this.list.$el.find("tr").length.should.equal(2);
  })
  it("should fetch() when initialized", function() {
    this.fetch_stub.should.have.been.calledOnce;
  })
  it("add event on the collection will trigger addHandler()", function() {
    
    this.users.add(new app.User({
      id: 3,
      username: "nameee3",
      password: "supersecret",
      roles: ["admin"]
    }));
    app.UsersView.prototype.addHandler.should.have.been.calledOnce;
  })
})