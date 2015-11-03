var express = require('express');
var router = express.Router();
var config = require('../config.js');
var db = require('orchestrate')(config.dbkey);
var passport = require('passport');
var util = require('util');
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var GitHubStrategy = require('passport-github2').Strategy;
var partials = require('express-partials');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

//----------Github passport things----------------
var GITHUB_CLIENT_ID = config.github_client_id;
var GITHUB_CLIENT_SECRET = config.github_client_secret;


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use('github', new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

router.use(passport.initialize());
router.use(passport.session());
router.use(logger('dev'));
router.use(cookieParser());

//----------------------------------------------

router.get('/', function(req, res, next) {
  if(req.user){
    console.log("cookie", req.cookies.user);
    res.render('user_session', { title: "Hello, " + req.user.displayName ,layout: 'layout', logged_user:req.cookies.url , banana:'yellow' , client_user_session: true});
  }
  else{
    console.log("!req.user");
    res.render('index', { title: 'OPP' , layout: 'layout' , banana:'red' , client_user_session: false });
  }
});

router.get('/test', function(req, res, next) {
  res.render('index', { title: 'OPP' , layout: 'tests_layout'});
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // console.log("req.path: ", req.path);
    req.session.returnTo = req.path;
    return next();
  }
  else {
    console.log("ensure authentication failed");
  }
}

router.put("/profiles/:id", ensureAuthenticated, function(req, res, next){
    var id = req.params.id;
    
    console.log("profile updated(not really)");
    // console.log("request body", req.body);
    console.log("twitter:", req.body.twitter_url);
    console.log("linkedin_url:", req.body.linkedin_url);
    console.log("personal_site_url:", req.body.personal_site_url);
    
    // db.newPatchBuilder("OPP_users", id)
    //   .replace("profile_content.social_urls.twitter", req.body.twitter_url)
    //   .replace("profile_content.social_urls.linkedin", req.body.linkedin_url)
    //   .replace("profile_content.social_urls.personal", req.body.personal_site_url)
    //   .apply()
    //   .fail(function(err){
    //     console.log("profiles update failed", err);
    //     send(err);
    //   });
});

router.get('/profiles', function(req, res, next) {
  db.list('OPP_users')
      .then(function (result) {
        var data = result.body.results;
        var mapped = data.map(function (element, index) {
          // console.log("profile: " ,element.path.key);
          // console.log("element values: ", element.value.profile_content.editable_text);
          /*
          console.log(element);
          console.log(element.value);
          console.log(element.value.profile_content);
          console.log(element.value.profile_content.editable_text.name);
          console.log(element.value.profile_content.editable_text.title);
          console.log(element.value.github_api_data.github_url);
          console.log(element.value.profile_content.social_urls);
          console.log(element.value.profile_content.social_urls.personal);
          console.log(element.value.profile_content.social_urls.linkedin);
          console.log(element.value.profile_content.social_urls.twitter);
          console.log(element.value.profile_content.editable_text.url_id);
          console.log(element.value.profile_content.checkbox_content.work_status);
          console.log(element.value.profile_content.editable_text.skills);
          console.log(element.value.profile_content.editable_text.tools);
          console.log(element.value.profile_content.editable_text.q_and_a.js_tidbit);
          console.log(element.value.profile_content.editable_text.q_and_a.job_hope);
          */
          // if(element.value.active === true){
          return {
            id: element.path.key,
            name: element.value.profile_content.editable_text.name ,
            title: element.value.profile_content.editable_text.title ,
            github_url: element.value.github_api_data.github_url ,
            profile_img_url: element.value.profile_content.img_urls.profile_img ,
            personal_site_url: element.value.profile_content.social_urls.personal ,
            linkedin_url: element.value.profile_content.social_urls.linkedin ,
            twitter_url: element.value.profile_content.social_urls.twitter ,
            url_id: element.value.profile_content.editable_text.url_id ,
            top_skills: element.value.profile_content.editable_text.skills ,
            top_tools: element.value.profile_content.editable_text.tools ,
            js_tidbit: element.value.profile_content.editable_text.q_and_a.js_tidbit ,
            work_status: element.value.profile_content.checkbox_content.work_status ,
            dream_job: element.value.profile_content.editable_text.q_and_a.job_hope
          };
        // }
      });
        // console.log("mapped: ", mapped);
        res.send(mapped);
      })    
      .fail(function(err){
        console.log("profiles get failed:", err);
        send(err);
      });
});

router.put("/projects/:id", ensureAuthenticated, function(req, res, next){
    var id = req.params.id;
    
    console.log("project updated(not really)");
    
    // db.put('OPP_projects', id, {
    //   "owner_reference" : req.body.owner_reference, 
    //   "project_content" : req.body.project_content
    // })
    // .then(function(result) {
    //   console.log("project updated");
    //   console.log("owner_reference", req.body.owner_reference);
    //   console.log("project_content", req.body.project_content);
    //   res.send({id: id});
    // })    
    // .fail(function(err){
    //   console.log("projects put failed:", err);
    //   send(err);
    // });
});

router.post("/projects", ensureAuthenticated, function(req, res, next){
console.log("post for projects ran");
  // db.post('OPP_projects', {
  //   "owner_reference": req.body.owner_reference,
  //   "project_content": req.body.project_content
  // })
  // .then(function (result) {
  //   console.log("project added");
  // })
  // .fail(function (err) {
  //   console.log("project post failed", err);
  //   send(err);
  // });
});

router.get('/projects', function(req, res, next) {
  db.list('OPP_projects')
      .then(function (result) {
        var data = result.body.results;
        var mapped = data.map(function (element, index) {
          console.log("project: " , element.path.key);
          //console.log(element);
          /*
          console.log(element.value.project_content.project_url_id);
          console.log(element.value);
          console.log(element.value.site_project_id);
          console.log(element.value.site_project_id);
          console.log(element.value.project_content.title);
          console.log(element.value.project_content.project_url_id);
          console.log(element.value.project_content.mvp);
          console.log(element.value.project_content.tech_used);
          */
          // if(element.value.active === true){
          return {
            id: element.path.key,
            title: element.value.project_content.title ,
            project_url_id: element.value.project_content.project_url_id,
            mvp: element.value.project_content.mvp,
            tech_used: element.value.project_content.tech_used
          };
        // }
      });
        //console.log(mapped);
        res.send(mapped);
      })    
      .fail(function(err){
        console.log("projects get failed:", err);
        send(err);
      });
});

router.get('/auth/github',
function(req, res, done){
  // console.log("req path", req.path);
  // console.log("req session", req.session);
  // console.log("req.query.url", req.query.url);
  console.log("query",req.query);
  req.session.returnTo = req.query.url;
  console.log("1req.session.returnTo: ", req.session.returnTo);
  done();
},
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  function(req, res){
    // The req will be redirected to GitHub for authentication, so this
    // function will not be called.
});

//keep history route
router.get('/auth/github/callback', passport.authenticate('github'), function(req, res) {
  console.log("2req.session.returnTo: ", req.session.returnTo);
    var cookieValue;
    function register(){
      db.post('OPP_users', {
         "active":true,  
         "github_api_data": {
           "github_id": req.user.id,
           "github_email": req.user._json.email,
           "github_display_name": req.user.displayName,
           "github_url": req.user.profileUrl,
           "github_avatar": req.user._json.avatar_url,
           "github_username": req.user.username
         } ,
         "project_reference": [] ,
         "profile_content": {
           "img_urls": {
             "profile_img": req.user._json.avatar_url ,
             "cover_photo": "" ,
             "hero_img": "" ,
             "action_shot": ""
           } ,
           "social_urls": {
             "personal": "",
             "linkedin": "",
             "twitter": ""
           } ,
           "editable_text": {
             "name": req.user.displayName,
             "title": "" ,
             "url_id": req.user.username,
             "skills": [] ,
             "tools": [] ,
             "q_and_a" : {
                 "js_tidbit": "" ,
                 "job_hope": "" ,
                 "politics": ""
             }
           } ,
           "checkbox_content" : {
             "work_status": []
           }
         }
      },false)
      .then(function(result){
        console.log("register function ran");
      })
      .fail(function(err){
          console.log("db post failed:",err);
        });
        res.cookie("url", req.user.username);
    }

    function updateInfo(key){
      console.log("update key", key);
      db.newPatchBuilder("OPP_users", key)
        .replace("github_api_data.github_id",req.user.id )
        .replace("github_api_data.github_email",req.user._json.email )
        .replace("github_api_data.github_display_name",req.user.displayName )
        .replace("github_api_data.github_url",req.user.profileUrl )
        .replace("github_api_data.github_avatar",req.user._json.avatar_url )
        .replace("github_api_data.github_username",req.user.username )
        .replace("profile_content.img_urls.profile_img",req.user._json.avatar_url )
        .replace("profile_content.editable_text.name",req.user.displayName )
        .replace("profile_content.editable_text.url_id",req.user.username )
        .apply()
      .fail(function (err) {
        console.log("patch failed");
      });
    }

    db.search('OPP_users', req.user.username)
      .then(function (result) {
        if(result.body.count>0){
          console.log("user exists");
          cookieValue = result.body.results[0].value.profile_content.editable_text.url_id;
          console.log("key", result.body.results[0].path.key);
          updateInfo(result.body.results[0].path.key);
          res.cookie("url", cookieValue);
        }
        else{
          register();
        }
      })
      .then(function(result){
        res.cookie("logged", true);
        res.cookie("user", req.user.username);
        console.log("2cookievalue: ", cookieValue);
        res.redirect(req.session.returnTo || "/");
        req.session.returnTo = null;
      })
      .fail(function (err) {
        console.log("db search failed:", err);
      });
});

router.get('/logout', function(req, res){
  req.session.returnTo = req.query.url;
  console.log("3req.session.returnTo: ", req.session.returnTo);
  req.logout();
  res.clearCookie("logged");
  res.clearCookie("user");
  res.clearCookie("url");


  res.redirect(req.session.returnTo || "/");
  req.session.returnTo = null;
});


module.exports = router;
