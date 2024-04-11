

const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const articleRouter = require("./routes/articles");
const Article = require("./models/article");
const methodOverride = require("method-override");
const PORT = process.env.PORT || 3000;



mongoose
  .connect("mongodb://127.0.0.1:27017/blogArt")
  .then(() => {
    console.log("DB connected");
  })
  .catch((e) => {
    console.log("not connected");
  });

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use("/articles", articleRouter);

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({
    createdAt: "desc",
  });
 
  res.render("articles/index", { articles: articles });
});
app.get("/about", function(req, res) {
    res.render("articles/about");
  });

  

app.listen(PORT, (req, res) => {
  console.log("runninng on 4000 port");
});






// const express = require("express");
// const ejs = require("ejs");
// const mongoose = require("mongoose");

// // connect mongodb

// mongoose.connect("mongodb://127.0.0.1:27017/jam")
//   .then(() => {
//     console.log("DB connected");
//   })
//   .catch((e) => {
//     console.log("not connected");
//   });
// const app = express();

// app.get("/",(req,res)=>{
//     res.send("welocome")
// })

// app.listen(3000,(req,res)=>{
//     console.log("runnng on port 3000");
// })