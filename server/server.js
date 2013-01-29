Meteor.publish("competitions", function() {
    return Competitions.find();
});
Meteor.publish("teams", function() {
    return Teams.find();
});
Meteor.publish("matches", function() {
    return Matches.find();
});
Meteor.publish("fields", function() {
    return Fields.find();
});

Meteor.startup(function() {
    // Set up initial match (DEBUG)
    /*
    if (Matches.find({current: true}).count() == 0) {
	curMatch = {
	    team0: {
		team_id: Teams.findOne({name: "TestTeam0"})._id,
		ballspossessed: 0,
		ballsoverwall: 0,
		ballspyramid1: 0,
		ballspyramid2: 0,
		ballspyramid3: 0
	    },
	    team1: {
		team_id: Teams.findOne({name: "TestTeam1"})._id,
		ballspossessed: 0,
		ballsoverwall: 0,
		ballspyramid1: 0,
		ballspyramid2: 0,
		ballspyramid3: 0
	    },
	    state: "current",
	};
	Matches.insert(curMatch);
    }
    */

    // Set up initial admin user, if not created yet
    if (Meteor.users.find({}).count() == 0) {
	Accounts.createUser({
	    username: "admin",
	    email: "maslab-staff@mit.edu",
	    password: "maslab-staff",
	    profile: {
		name: "MASLAB Staff",
		isAdmin: "true",
	    },
	});
    }
});
