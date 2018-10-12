const express = require("express");
const https = require("https");
const fs = require( "fs" );
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sqlite3 = require('sqlite3').verbose();



var addNewUser = require('./public/scripts/addNewUser');
var getUser = require('./public/scripts/getUser');
var blaaaaat = require('./public/scripts/blaaaaat');
var createPage = require('./public/scripts/createPage')

var app = express();
/*
httpsOptions = {
    key: fs.readFileSync("server.key"), // путь к ключу
    cert: fs.readFileSync("server.crt") // путь к сертификату
}
*/

app.set("view engine","ejs");
app.use("/public",express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser('Secret string'));
var urlencodedParser = bodyParser.urlencoded({ extended: false });


//обработчики****************

app.use(blaaaaat.getPageUrl);



//***************************

app.get("/",function(req,res){
	res.redirect('/Templates');
});

app.get("/Templates",function(req,res){
	res.render("paralax");
});

app.get("/signup",function(req,res){
	res.render("signup");
});

app.post("/registrationNewUser",addNewUser.addNew);

app.route("/Login")
.get(function(req,res){
	res.render("login");
})
.post(getUser.getUser);

app.get("/getCurrentUser",function(req, res) {
		res.writeHead(200, {'Content-Type':'application/json'}); 
		var obj = JSON.stringify(req.cookies.login);
		res.end(obj); 
	});

app.route('/UserPage')
	.get(function(req, res) {
		res.render("UserPage",{currentUser : req.cookies.login});
	})
	.post(function(req, res) {
		if (!req.body) return res.sendStatus(400);

	});
app.get('/exit',function(req,res){
	var user = {username: null, password: null, email: null};
	res.cookie('login', user, { maxAge : 35000 });

	res.redirect("index");
});


app.route('/createNewPage')
	.get(function(req,res){
		res.render('createNewPage');
	})

	.post(createPage.CreateNewPage);

app.listen(3030);
//https.createServer(httpsOptions, app).listen(443);