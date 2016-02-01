var ejs = require("ejs");
var mysql = require('./mysql');
/*var userid= require('./home');*/

exports.insertUser = function(req, res) {

	var getUser="select * from User where emailid='" + req.param("email")
	+ "'";
	console.log("Query is:"+getUser);

	mysql.fetchData(function(err,results){
		if(err){
			throw err;
			}
		else
		{
			if(results.length > 0){
				console.log("Already Registered");

				//res.redirect('/successSignIn');
				res.send({"registeration":"Already Registered"});
				}
			else {

					var query = "insert into User values('" +req.param("email")
		+ "','" + req.param("first_name")
		+ "','" + req.param("last_name") + "','" + req.param("password") + "',null,null,null,null,null)";

var fullname=req.param("first_name") + " " + req.param("last_name")
console.log("Query is:" + query);

mysql.fetchData(function(err, results) {
	if (err) {
		throw err;
	} else {
		console.log("new user registered");
		res.send({"registeration":"Successfull"});
	}
}, query);
			}
		}
	},getUser);

}
