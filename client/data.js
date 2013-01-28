// Subscribe to server data
Meteor.subscribe("competitions");
Meteor.subscribe("teams");
Meteor.subscribe("matches", function() {
    Session.set("cur_match", Matches.findOne({state: 'current'}));
});
Meteor.subscribe("fields");