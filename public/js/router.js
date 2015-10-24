App.Router = Backbone.Router.extend({
  initialize: function(opts){
    //console.log(opts);
    this.profiles = opts.profiles;
    this.projects = opts.projects;
    //console.log(this)
  },
  routes:{
    '' : 'index' ,
    'profiles' : 'profiles' ,
    //'profiles/:id' : 'profiles' ,
    //'projects' : 'projects' ,
    //'projects/id': 'projects'
  } ,
  index: function(){
    //console.log("Router.index")

    $('#app').empty();
    app.navigationView = new App.Views.NavigationView();
    app.centerView = new App.Views.CenterView();
    app.mainView = new App.Views.MainView();
    app.footerView = new App.Views.FooterView();
  } ,
  profiles: function(){
    $('#app').empty();
    app.navigationView = new App.Views.NavigationView();
    app.centerView = new App.Views.CenterView();
    console.log("this this this:   " ,this);
    app.allProfilesView = new App.Views.AllProfilesView({collection: this.profiles});
    app.footerView = new App.Views.FooterView();
  } ,
  projects: function(){
    $('#app').empty();
    app.navigationView = new App.Views.NavigationView();
    app.centerView = new App.Views.CenterView();
    console.log("this this this:   " ,this);
    app.allProjectsView = new App.Views.AllProjectsView({collection: this.projects});
    app.footerView = new App.Views.FooterView();
  }

});






App.Router.profiles = function(){
  console.log("Router.profiles");
  //console.log("user is ", user);
/*
  $('.centerdiv').empty();
  if(user){
    var usermodel;
    console.log("models",app.profile_content.models);
    for( var i=0; i < app.profile_content.models.length; i++ ){
      if( app.profile_content.models[i].attributes.url_id == user){
        usermodel = app.profile_content.models[i];
      }
    }
    console.log("usermodel is ", usermodel);
    var view1 = new App.Views.ProfileView({model:usermodel});
  }
  else{
  var view2 = new App.Views.AllProfilesView();
  }
*/
};

App.Router.projects = function(){
  console.log("Router.projects");
  /*
  $('.centerdiv').empty();
  if(project){
    var projectmodel;
    console.log("models",app.project_content.models);
    for( var i=0; i < app.project_content.models.length; i++ ){
      if( app.project_content.models[i].attributes.project_urlid == project ){
        projectmodel = app.project_content.models[i];
      }
    }
    console.log("usermodel is ", projectmodel);
    var view1 = new App.Views.ProjectView({model:projectmodel});
  }else{
    var view2 = new App.Views.AllProjectsView();
  }
  */
};
