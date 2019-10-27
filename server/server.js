var loopback = require('loopback');
var boot = require('loopback-boot');
var bodyParser = require('body-parser');
var session = require('express-session');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var express = require('express');
var fs = require('fs');
var app = express();
app = module.exports = loopback();
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(session({
	secret: 'anubhavApp'
}));
app.use(fileUpload());

app.start =
 function() {
	// start the web server
	return app.listen(
		function() {
		app.emit('started');
		var baseUrl = app.get('url').replace(/\/$/, '');
		console.log('Web server listening at: %s', baseUrl);
		if (app.get('loopback-component-explorer')) {
			var explorerPath = app.get('loopback-component-explorer').mountPath;
			console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
		}

		app.get("/getSpecial", function(req, res){

			var userTable = app.models.AppUser;
			var roleTable = app.models.userRole;
			userTable.find({where: {userId : 'anubhav'}}, function(err, result){
				debugger;
				var userId = result[0].id.toString();
				var userName = "'" +  result[0].firstName.toString() + "'";
				roleTable.find({where: {UserId : userId}}, function(err, userRole){
					var arr = [];
					for (var i = 0; i < userRole.length; i++) {
						arr.push({ "user": userName , "role" : userRole[i].RoleId });
					}
					res.send(arr);
				});

			});


		});



	});
};


// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
	if (err) throw err;

	// start the server if `$ node server.js`
	if (require.main === module)
		app.start();
});
