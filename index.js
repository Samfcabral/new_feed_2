
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var pg = require("pg");
var methodOverride = require("method-override");
app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

config =  {
    database: "articles_app",
    port: 5432,
    host: "localhost"
};


app.get("/articles", function (req, res) {
  pg.connect(config, function(err, client, done){
        if (err) {
            console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
        }
        client.query("SELECT * FROM articles", function (err, result) {
            done(); 
            console.log(result.rows);  
            res.render("articles/index", {articleList: result.rows});         
        });
    });
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

app.get("/articles/:id", function (req, res) {

  pg.connect(config, function(err, client, done){
        if (err) {
             console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
        }
        client.query("SELECT * FROM articles WHERE id=$1", [req.params.id], function (err, result) {
            done(); 
            console.log(result.rows);
          if (result.rows.length) {
            res.render("articles/show", {article: result.rows[0]});
          } else {
            // read about this http://expressjs.com/api.html#res.status
            res.status(404).send("Article Not Found");
          }      
        });

    });
});

app.post("/articles", function (req, res) {
  var newArticle = req.body.article;
  pg.connect(config, function(err, client, done){
      if (err) {
           console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
      }
      client.query("INSERT INTO articles (title, content) VALUES ($1, $2) RETURNING *", [newArticle.title, newArticle.content], function (err, result) {
          done(); 
          console.log(result.rows);  
          var article = result.rows[0];   
          res.redirect("articles/" + article.id);      
      });

  });
});

app.delete("/articles/:id", function (req, res) {
  var articleID = parseInt(req.params.id);
  var articleIndex = null;
  for (var i = 0, notFound = true; i < articles.length && notFound; i+=1) {
    if (articles[i].id == articleID) {
      notFound = false;
      bookIndex = i;
    }
  }
  if (notFound) {
    res.send(404).send("Book Not Found");
  } else {
    articles.splice(bookIndex, 1);
    res.redirect("articles");
  }
});

app.listen(3000, function () {
	console.log("GO TO http://localhost:3000/");
});


























