var ejs = require("ejs");
var mysql = require('./mysql');
//var mysql = require('./mySQLConnectionPool');

// var LocalStorage = require('node-localstorage').LocalStorage,
// localStorage = new LocalStorage('./scratch');
var Member_userId;

function signin(req,res) {

	ejs.renderFile('./views/signin1.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}

function afterSignIn(req,res)
{
	// check user already exists
	var getUser="select * from User where emailid='" + req.param("username")
	+ "' AND password='" + req.param("password") + "'";
	console.log("Query is:"+getUser);

	mysql.fetchData(function(err,results){
		if(err){
			throw err;
			}
		else
		{
			if(results.length > 0){
				console.log("valid Login");
				console.log(results);
				//recording login time
			//	localStorage.setItem('currentLoginTime', Date());
				//res.redirect('/successSignIn');
				var userEmail= results[0].emailid;
				exports.userName=userEmail;
				console.log(userEmail);
				req.session.sessionData = userEmail;
				console.log(userEmail);
				res.send({"login":"Success"});
				}
			else {

				console.log("Invalid Login");
				res.send({"login":"Fail"});
			}
		}
	},getUser);
}

function homepage(req,res) {
	ejs.renderFile('./views/homepage.ejs',function(err, result) {
	   // render on success
	   if (!err) {
				res.end(result);
	   }
	   // render or error
	   else {
				res.end('An error occurred');
				console.log(err);
	   }
   });
}

function overview(req,res)
{
	// check user already exists
	var getWorkInfo="select * from UserWorkInfo where emailid='" + req.session.sessionData + "'";

	var getInterests = "select * from UserInterests where emailid='" + req.session.sessionData + "'";
	console.log("Query is:"+getWorkInfo);
	console.log("Query is:"+getInterests);

	mysql.fetchData(function(err,workInfoResults){
		if(err){
			throw err;
			}
		else
		{
			if(workInfoResults.length > 0){
				console.log("valid Login");
				console.log(workInfoResults);
	res.send({"workexperience":JSON.stringify(workInfoResults)});
				}
			else {
				console.log("Invalid Overview");
				res.send({"Overview":"Fail"});
			}
		}
	},getWorkInfo);

}


function friends(req,res)
{
	var freindReqInfo="select * from UserFriendList where emaiid='" +req.session.sessionData+ "'";
	console.log("FreindReq Query is:"+freindReqInfo);

	mysql.fetchData(function(err,frendResults) {
		if (!err) {
			var friendstring =  frendResults[0].friends;
			console.log(friendstring);
			var friendArray = friendstring.split(",");
			console.log(friendArray);
			res.send({"friendlist": JSON.stringify(friendArray) });
			}
			// render or error
			else {
				res.end('An error occurred');
				console.log(err);
			}
		}, freindReqInfo);
}

function interests(req,res)
{
	// check user already exists
	var getWorkInfo="select * from UserWorkInfo where emailid='" + req.session.sessionData + "'";

	var getInterests = "select * from UserInterests where emailid='" + req.session.sessionData + "'";
	console.log("Query is:"+getInterests);
					mysql.fetchData(function(err,interests){
					if(err){
						throw err;
						}
					else
					{
						if(interests.length > 0){
							console.log("valid Login");
							console.log(interests);
							res.send({"interests": JSON.stringify(interests)});
							}
						else {
							console.log("Invalid interests");
							res.send({"Overview":"Fail"});
						}
					}
				},getInterests);
}

function successLogin(req,res)
{

	ejs.renderFile('./views/homepage.ejs',function(err, result) {
  		// render on success
        if (!err) {
            res.end(result);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
	 });
}

function aboutPage(req,res)
{

	ejs.renderFile('./views/About.ejs',function(err, result) {
  		// render on success
        if (!err) {
            res.end(result);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
	 });
}

function sendRequest(req,res)
{
	var query = "insert into UserFriendRequest values('"+req.session.sessionData+"','"+req.param("friendId")+"','"+req.param("status")+"')";
	console.log("Query is:"+query);


	mysql.fetchData(function(err,results){
		if(err){
			throw err;
			}
		else
		{
			var freindReqInfo="select * from UserFriendRequest where requestfrom='" +req.session.sessionData+ "'";
			console.log("FreindReq Query is:"+freindReqInfo);

			mysql.fetchData(function(err,frendrequestResults) {
				if (!err) {
					console.log("friend added successfully");
					res.send({"friendreq": JSON.stringify(frendrequestResults) });
					}
					// render or error
					else {
						res.end('An error occurred');
						console.log(err);
					}
				}, freindReqInfo);
			}

	},query);
}

function notifications(req,res)
{
	var query = "select * from UserFriendRequest where requestto='" +req.session.sessionData+ "' and status = 'pending'";
	console.log("Query is:"+query);


	mysql.fetchData(function(err,notifications){
		if(err){
			throw err;
			}
		else
		{
			console.log("notifications are :"+notifications[0]);
			res.send({"notifications": JSON.stringify(notifications)});
			}

	},query);
}


function addNewsFeed(req,res)
{
	var query = "insert into NewsFeed values('"+req.session.sessionData+"','"+req.param("content")+"',"+null+" ,'"+req.param("name")+"')";
	console.log("Query is:"+query);
	mysql.fetchData(function(err,newsfeeds){
		if(err){
			throw err;
			}
		else
		{
			console.log("newsfeeds updated :"+notifications[0]);
			res.send({"newsfeeds": JSON.stringify(newsfeeds)});
			}
	},query);
}

function newsfeeds(req,res)
{
	var query = "Select * from NewsFeed";
	console.log("Query is:"+query);
	mysql.fetchData(function(err,newsfeeds){
		if(err){
			throw err;
			}
		else
		{
			console.log("newsfeeds updated :"+notifications[0]);
			res.send({"newsfeeds": JSON.stringify(newsfeeds)});
			}
	},query);
}

function group(req,res) {
	ejs.renderFile('./views/Group.ejs',function(err, result) {
	   // render on success
	   if (!err) {
				res.end(result);
	   }
	   // render or error
	   else {
				res.end('An error occurred');
				console.log(err);
	   }
   });
}
function signout(req,res) {
	if(req.session.sessionData){
		req.session.destroy();
		res.render('signin1');
	}
}
exports.signin=signin;
exports.afterSignIn = afterSignIn;
exports.successLogin = successLogin;
exports.aboutPage = aboutPage;
exports.overview = overview;
exports.interests = interests;
exports.friends = friends;
exports.sendRequest = sendRequest;
exports.notifications = notifications;
exports.homepage = homepage;
exports.addNewsFeed = addNewsFeed;
exports.newsfeeds = newsfeeds;
exports.group = group;
exports.signout = signout;
