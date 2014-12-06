
var express = require("express");

var app = express();
var bodyParser = require("body-parser");

var articles = [{title: "A New Hope", content: "It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire’s ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet. Pursued by the Empire’s sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy…."},
				{title: "Return of the Jedi", content: "It is a dark time for the Rebellion. Although the Death Star has been destroyed, Imperial troops have driven the Rebel forces from their hidden base and pursued them across the galaxy. Evading the dreaded Imperial Starfleet, a group of freedom fighters led by Luke Skywalker has established a new secret base on the remote ice world of Hoth. The evil lord Darth Vader, obsessed with finding young Skywalker, has dispatched thousands of remote probes into the far reaches of space…."},
				{title: "Empire Strikes Back", content: "Turmoil has engulfed the Galactic Republic. The taxation of trade routes to outlying star systems is in dispute. Hoping to resolve the matter with a blockade of deadly battleships, the greedy Trade Federation has stopped all shipping to the small planet of Naboo. While the congress of the Republic endlessly debates this alarming chain of events, the Supreme Chancellor has secretly dispatched two Jedi Knights, the guardians of peace and justice in the galaxy, to settle the conflict...."}];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/articles", function (req, res) {
	res.render("articles/index", {articleList: articles});
});

app.get("/", function (req, res) {
	res.render("index");
})

app.get("/articles/new", function (req, res) {
	res.render("articles/new");
});

app.get("/about", function (req, res) {
	res.render("about");
});

app.get("/contact", function (req, res) {
	res.render("contact");
});

app.post("/articles", function (req, res) {
	console.log(req.body);
	articles.push(req.body);
	res.redirect("/articles");
});

app.listen(3000, function () {
	console.log("GO TO http://localhost:3000/");
});

