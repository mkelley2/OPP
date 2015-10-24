var app = app || {};

$(function() { //when DOM is ready...
		app.profile_content = new ProfileCollection();
		app.project_content = new ProjectCollection();
		app.router = new App.Router({
			profiles: app.profile_content ,
			projects: app.project_content
		});
		Backbone.history.start({pushState:false});
});
