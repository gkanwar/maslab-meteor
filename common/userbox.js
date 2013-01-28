if (Meteor.isClient) {
    Template.userBox.events({
	"click .logout": function() {
	    Meteor.logout();
	}
    });
}