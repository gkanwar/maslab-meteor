Template.admin.events({
    "click #cc-form-submit": function() {
	console.log("Creating competition!");
	Competitions.insert({
	    title: $("#cc-form-title").val(),
	    numteams: parseInt($("#cc-form-numteams").val())
	});
    },
});
Template.admin.allCompetitions = function() {
    return Competitions.find();
}

