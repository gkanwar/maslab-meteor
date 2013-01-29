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

Template.leaderboard.start = function() {
    var cur_match = Session.get("cur_match");
    return cur_match.start;
};
Template.leaderboard.countdown_started = function() {
    var cur_match = Session.get("cur_match");
    return (cur_match && (typeof cur_match.start == "string"));
};

var timer = setInterval(update_timer, 500);
function update_timer() {
    var time = $(".timer").attr("starttime");
    // Check for null
    if (!time) {
	$(".timer").text("3:00");
	return;
    }
    time = new Date(time);
    countup = new Date(new Date() - time);
    countdown = new Date(new Date(3*60*1000) - countup);
    // Check for countdown done
    if (countdown < new Date(0)) {
	$(".timer").text("Done");
	// TODO: trigger updating state
	return;
    }
    mins = countdown.getMinutes();
    secs = countdown.getSeconds();
    if (secs < 10) { secs = "0"+secs; }
    
    $(".timer").text(mins+":"+secs);
};

Template.leaderboard.events({
    "click .at-reset": function() {
	var cur_match = Session.get("cur_match");
	update_obj = {start: null};
	Matches.update(cur_match._id, {$set: update_obj});
	Session.set("cur_match", Matches.findOne({state: "current"}));
    },
    "click .at-start": function() {
	var cur_match = Session.get("cur_match");
	update_obj = {start: new Date()};
	Matches.update(cur_match._id, {$set: update_obj});
	Session.set("cur_match", Matches.findOne({state: "current"}));
    },	
});


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