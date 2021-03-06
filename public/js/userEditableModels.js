//===============
//USER-EDITABLE MODELS
//===============
// -- Edit Models should be subclasses of their read-only counterparts
// -- There is no need for Edit Models to be stored in Collections , because the client will only ever have one at a time
//===============

//Logged-in User only ever has access to one Profile Edit Model
//prof img & url id
var ProfileEditorModel = Backbone.Model.extend({
	defaults: {
		profile_img_url:'http://placehold.it/100x100' ,
		arbitrary_string: '',
		arbitrary_boolean: false
	} ,
	urlRoot: '/user_profile' ,
	initialize: function() {
		console.log("initialize profile editor model");
		//this.fetch({
		//	success:function(){
		//		console.log("%cProfileEditModel","color:rgba(100,100,100,1.0);font-size:1.25em;");
		//	}
		//});
	} ,
	save_profile: function() {
		//this will model.save()
		//Make a put request at /user_profile
	}
});

//Logged-in User only ever has access to one Project Edit Model at a given time
var ProjectEditorModel = Backbone.Model.extend({
	defaults: {
		title:''
	} ,
	urlRoot: '/user_project/:project_url_id' ,
	initialize: function() {
		this.fetch({
			success:function(){
				console.log("%cProjectEditModel","color:rgba(100,100,100,1.0);font-size:1.25em;");
			}
		});
	} ,
	add_project: function() {
		//model.save()
		//Make a post request at /user_project/:project_url_id
	},
	save_project: function() {
		//model.save()
		//Make a put request at /user_project/:project_url_id
	} ,
	delete_project: function() {
		//model.destroy()
	}
});
