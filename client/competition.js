Template.admin_competition.events({
    "click #ct-form-submit": function() {
	console.log("Creating team!");
	Teams.insert({
	    name: $("#ct-form-name").val(),
	    numplayers: parseInt($("ct-form-numplayers").val()),
	    parent_competition: Session.get("competitionId"),
	})
    },
});
Template.admin_competition.allMatches = function() {
    return Matches.find({parent_competition: Session.get("competitionId")});
};
Template.admin_competition.allTeams = function() {
    return Teams.find({parent_competition: Session.get("competitionId")});
};