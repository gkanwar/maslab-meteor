Handlebars.registerHelper('loggedIn', function() {
    return Meteor.user() != null;
});