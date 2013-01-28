var MaslabRouter = Backbone.Router.extend({
    routes: {
	"": "main",
	"admin/competition/:id": "admin_competition",
	"admin": "admin",
	"admin/": "admin"
    },
    main: function () {
	Session.set("currentPage", "main");
    },
    admin_competition: function(id) {
	Session.set("currentPage", "admin_competition");
	Session.set("competitionId", id);
    },
    admin: function() {
	Session.set("currentPage", "admin");
    }
});
var app = new MaslabRouter;
Meteor.startup(function() {
    Backbone.history.start({pushState: true});
});

Template.main.pageIs = function (page) {
    return Session.get("currentPage") == page;
};
Template.main.currentPage = function() {
    return Session.get("currentPage");
};
