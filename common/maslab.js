// Set up the databases

Teams = new Meteor.Collection("teams");
Competitions = new Meteor.Collection("competitions");
Matches = new Meteor.Collection("matches");
Fields = new Meteor.Collection("fields");

// Set up permissions
Competitions.allow({
    insert: function (userId, doc) {
	// User must be logged in
	return userId;
    },
    update: function (userId, docs, fields, modifier) {
	// User must be logged in
	return userId;
    },
    remove: function (userId, docs) {
	// User must be logged in
	return userId;
    }
});
Matches.allow({
    insert: function (userId, doc) {
	// User must be logged in
	return userId;
    },
    update: function (userId, docs, fields, modifier) {
	// User must be logged in
	return userId;
    },
    remove: function (userId, docs) {
	// User must be logged in
	return userId;
    }
});
Teams.allow({
    insert: function (userId, doc) {
	// User must be logged in
	return userId;
    },
    update: function (userId, docs, fields, modifier) {
	// User must be logged in
	return userId;
    },
    remove: function (userId, docs) {
	// User must be logged in
	return userId;
    }
});
Fields.allow({
    insert: function (userId, doc) {
	// User must be logged in
	return userId;
    },
    update: function (userId, docs, fields, modifier) {
	// User must be logged in
	return userId;
    },
    remove: function (userId, docs) {
	// User must be logged in
	return userId;
    }
});

// Set up user creation so only admin accounts can create more users
Meteor.users.allow({
    update: function(userId, doc) {
	return (userId && Meteor.user().profile.isAdmin);
    },
    insert: function(userId, doc) {
	return (userId && Meteor.user().profile.isAdmin);
    }
});