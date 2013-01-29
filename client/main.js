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
}
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
    var team_index = this.index;
    var total = 0;
    var fields = Fields.find().fetch();
    for (var index in fields) {
	var field = fields[index];
	var field_val = cur_match["team" + team_index][field.tag];
	total += field_val*field.value;
    }
    return total;
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
    var score = cur_match["team" + this.team_index][this.tag];
    if (!score) {
	update_obj = {};
	update_obj["team"+this.team_index+"."+this.tag] = 0;
	Matches.update(cur_match._id, {$set: update_obj});
	return 0;
    }
    return score;
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