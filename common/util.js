function getOrCreateScore(match, team_index, tag) {
    var score = match["team" + team_index][tag];
    if (!(typeof score == "number")) {
	update_obj = {};
	update_obj["team"+team_index+"."+tag] = 0;
	Matches.update(match._id, {$set: update_obj});
	return 0;
    }
    return score;
}
function getTeamScore(match, team_index) {
    var total = 0;
    var fields = Fields.find().fetch();
    for (var index in fields) {
	var field = fields[index];
	var field_val = getOrCreateScore(match, team_index, field.tag);
	total += field_val*field.value;
    }
    return total;
}    