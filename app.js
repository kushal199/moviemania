//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const multer = require("multer");
const mongoose = require("mongoose");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



mongoose.connect("mongodb+srv://kushu:test123@cluster0-ep1nm.mongodb.net/movie",{useNewUrlParser:true,useUnifiedTopology: true});
const postSchema = {
  name: String,
  year: String,
  content: String,
  img:String
};


const Post = mongoose.model("Post", postSchema);
const Action = mongoose.model("action", postSchema);
const Horror = mongoose.model("horror", postSchema);



app.get("/",function(req,res){
  Post.find({}, function(err, posts){
    Action.find({}, function(err, postf){
      Horror.find({}, function(err, posth){

  res.render("home",{p:posts,a:postf,h:posth});
  //var po=JSON.stringify(posts);
  //res.send(posts);

  //console.log(po);

  });
});
});
});



app.get("/compose",function(req,res){
  res.render("compose");
});

app.get("/action",function(req,res){
  res.render("action");
});

app.get("/horror",function(req,res){
  res.render("horror");
});




var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upimg')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
  }
});
var upload = multer({ storage: storage }).single('file');



app.post("/compose",upload,function(req,res){
  const post = new Post({
    name:req.body.nam,
    year:req.body.k ,
    content:req.body.p,
    img:req.file.filename
  });
  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });

});


app.post("/action",upload,function(req,res){
  const post = new Action({
    name:req.body.nam,
    year:req.body.k ,
    content:req.body.p,
    img:req.file.filename
  });
  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });

});


app.post("/horror",upload,function(req,res){
  const post = new Horror({
    name:req.body.nam,
    year:req.body.k ,
    content:req.body.p,
    img:req.file.filename
  });
  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });

});

//app.get("/details",function (req,res) {
//  res.render("details");
//});

app.get("/compose/:postId",function(req,res){
  const requestedPostId = req.params.postId;

    Post.findOne({_id: requestedPostId}, function(err, post){
      res.render("details", {
        name: post.name,
        year:post.year,
        content: post.content,
        img:post.img,
        id:post._id
      });
    });
});

app.get("/action/:postId",function(req,res){
  const requestedPostId = req.params.postId;

    Action.findOne({_id: requestedPostId}, function(err, post){
      res.render("details", {
        name: post.name,
        year:post.year,
        content: post.content,
        img:post.img,
        id:post._id
      });
    });
});

app.get("/horror/:postId",function(req,res){
  const requestedPostId = req.params.postId;

    Horror.findOne({_id: requestedPostId}, function(err, post){
      res.render("details", {
        name: post.name,
        year:post.year,
        content: post.content,
        img:post.img,
        id:post._id
      });
    });
});

app.get("/delete/:id",function (req,res) {
    const requestedPostId = req.params.id;
    Post.deleteOne({_id:requestedPostId }, function (err) {
      Action.deleteOne({_id:requestedPostId }, function (err) {
        Horror.deleteOne({_id:requestedPostId }, function (err) {


  res.redirect("/")

});
});
});
});




let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
