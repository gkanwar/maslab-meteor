// Set up template calls
Template.leaderboard.team0 = function() {
    var cur_match = Session.get("cur_match");
    if (cur_match) {
	var team = Teams.findOne(cur_match.team0.team_id);
	if (team != null) {
	    team.index = 0;
	    return team;
	}
    }
    return null;
};
Template.leaderboard.team1 = function() {
    var cur_match = Session.get("cur_match");
    if (cur_match) {
	var team = Teams.findOne(cur_match.team1.team_id);
	if (team != null) {
	    team.index = 1;
	    return team;
	}
    }
    return null;
};
Template.leaderboard.currentMatch = function() {
    return Session.get("cur_match");
};
Template.team_display.score = function() {
    var cur_match = Matches.findOne({state: "current"});
    Session.set("cur_match", cur_match);
    return getTeamScore(cur_match, this.index);
};
Template.team_display.fields = function() {
    var team_index = this.index;
    var fields = Fields.find().fetch();
    for (var index in fields) {
	var field = fields[index];
	field.team_index = team_index;
    }
    return fields;
};
Template.field.getScore = function() {
    var cur_match = Session.get("cur_match");
    return getOrCreateScore(cur_match, this.team_index, this.tag);
};
Template.field.events({
    "click .plus": function() {
	var cur_match = Session.get("cur_match");
	var value = cur_match["team" + this.team_index][this.tag];
	var update_obj = {}
	update_obj["team"+this.team_index+"."+this.tag] = value+1;
	Matches.update(cur_match._id, {$set: update_obj});
	Session.set("cur_match", Matches.findOne(cur_match._id));
    },
    "click .minus": function() {
	var cur_match = Session.get("cur_match");
	var value = cur_match["team" + this.team_index][this.tag];
	var update_obj = {}
	update_obj["team"+this.team_index+"."+this.tag] = value-1;
	Matches.update(cur_match._id, {$set: update_obj});
	Session.set("cur_match", Matches.findOne(cur_match._id));
    }
});