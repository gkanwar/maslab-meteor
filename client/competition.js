Template.admin_competition.events({
    "click #ct-form-submit": function() {
	console.log("Creating team!");
	Teams.insert({
	    name: $("#ct-form-name").val(),
	    numplayers: parseInt($("ct-form-numplayers").val()),
	    parent_competition: Session.get("competitionId"),
	});
    },
    "click #cm-form-submit": function() {
	console.log("Creating match!");
	Matches.insert({
	    team0: {
		team_id: $("#cm-form-team0").val(),
	    },
	    team1: {
		team_id: $("#cm-form-team1").val(),
	    },
	    state: "queued",
	    parent_competition: Session.get("competitionId"),
	});
    },
});
Template.admin_competition.allMatches = function() {
    return Matches.find({parent_competition: Session.get("competitionId")});
};
Template.admin_competition.allTeams = function() {
    return Teams.find({parent_competition: Session.get("competitionId")});
};
Template.admin_match.allStates = function() {
    var state_names = ["current", "queued", "done"];
    var states = [];
    for (var index in state_names) {
	states.push({
	    name: state_names[index],
	    isCurrentState: (this.state == state_names[index]),
	});
    }
    return states;
};
Template.admin_match.events({
    "click .admin_match_state": function(event, template) {
	console.log("click .admin_match_state");
	Matches.update(this._id, {$set: {state: $(template.find(".admin_match_state")).val()}});
	Session.set("cur_match", Matches.findOne({state: "current"}));
    }
});
Template.admin_match.getTeamName = function(index) {
    var team = Teams.findOne(this["team"+index].team_id);
    if (team) {
	return team.name;
    }
    return "";
};
Template.admin_match.getTeamScore = function(index) {
    return getTeamScore(this, index);
};