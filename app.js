
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var home = require('./routes/home');
var signup = require('./routes/signup');
var session = require('client-sessions');

var app = express();

app.use(session({

cookieName: 'session',
secret: 'cmpe273_test_string',
duration: 30 * 60 * 1000,
activeDuration: 5 * 60 * 1000,  }));
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', home.signin);
app.get('/signin', home.signin);
app.post('/signin', home.afterSignIn);
app.get('/homepage', home.homepage);
app.get('/successLogin', home.successLogin);
app.get('/notifications', home.notifications);
app.get('/overview',home.overview);
app.get('/friends',home.friends);
app.get('/interests',home.interests);
app.get('/aboutPage', home.aboutPage);
app.post('/insertUser', signup.insertUser);
app.post('/sendRequest',home.sendRequest);
app.get('/users', user.list);
app.post('/addNewsFeed',home.addNewsFeed);
app.get('/newsfeeds',home.newsfeeds);
app.get('/group', home.group);
app.get('/signout',home.signout);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
