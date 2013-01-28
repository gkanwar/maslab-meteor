Template.admin.events({
    "click #cc-form-submit": function() {
	console.log("Creating competition!");
	Competitions.insert({
	    title: $("#cc-form-title").val(),
	    numteams: parseInt($("#cc-form-numteams").val())
	});
    },
    "click #ct-form-submit": function() {
	console.log("Creating team!");
	Teams.insert({
	    name: $("#ct-form-name").val(),
	    numplayers: parseInt($("ct-form-numplayers").val())
	})
    },
});
Template.admin.allCompetitions = function() {
    return Competitions.find();
}

