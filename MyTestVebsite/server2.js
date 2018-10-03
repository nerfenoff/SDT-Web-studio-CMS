var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


var app = express();

var users = [
    {
        username: "admin",
        password: "admin",
        email: "admin@mail.com"
    }
]


app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.use("/front", express.static("front"));
app.use(bodyParser.json());
app.use(cookieParser('Secret string'));
var urlencodedParser = bodyParser.urlencoded({extended: false});

//обработчики****************
app.use(function (req, res, next) {
    if (req.cookies.login == null) {
        var newUser = {username: null, password: null, email: null};
        res.cookie('login', newUser);
    }
    next();
});

//***************************

app.get("/", function (req, res) {
    res.render("index");
});
app.get("/index", function (req, res) {
    res.render("index");
});

/*app.get("/screenshot/:id",function(req,res){
	var pageCount = ImgRes.length / 3;
	res.render("screenshot",{array: ImgRes, begin: req.params.id, pageCount: pageCount});
});*/

app.get("/registration", function (req, res) {
    res.render("registration");
});

app.post("/registrationNewUser", urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    var user = {username: req.body.username, password: req.body.pass, email: req.body.email};
    res.cookie('login', user, {maxAge: 35000});
    add(user);

    res.redirect("UserPage");
});

function add(user) {
    var newUser = {username: user.username, password: user.password, email: user.email};
    users.push(newUser);
}

app.route("/login").get(function (req, res) {
    res.render("login");
}).post(urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    var found = false;

    for (var i = 0; i < users.length; ++i) {
        if (users[i].username == req.body.username) {
            res.cookie('login', users[i], {maxAge: 35000});
            found = true;
            break;
        }
    }
    if (found) {
        console.log("sucsess");
        res.redirect("UserPage");

    }
    else {
        res.writeHead(200, {'Content-Type': 'text/plan'});

        res.end("try again");
    }

});

app.get("/getCurrentUser", function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    var obj = JSON.stringify(req.cookies.login);
    res.end(obj);
});

app.route('/UserPage').get(function (req, res) {
    res.render("UserPage", {currentUser: req.cookies.login});
}).post(function (req, res) {
    if (!req.body) return res.sendStatus(400);

});
app.get('/exit', function (req, res) {
    var user = {username: null, password: null, email: null};
    res.cookie('login', user, {maxAge: 35000});

    res.redirect("index");
});


app.listen(3000);