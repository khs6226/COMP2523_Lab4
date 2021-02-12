/*
 Authors: Hongsoon Kim
 Your name and student #: A01247468
 Your Partner's Name and student #:
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require('fs');

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  // Add your implementation here 
  let data = req.body.movies.split(", ");
  console.log(data);

  res.render('pages/', { movies: data });
});

app.get("/myListQueryString", (req, res) => {
  // Add your implementation here
  let data = Object.values(req.query);
  console.log('query', data);
  res.render('pages/', { movies: data});
});

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
  let movieTitle = req.params.movieName.slice(1);
  console.log('specific', movieTitle);
  fs.readFile('movieDescriptions.txt', 'utf-8', (err, data) => {
    let movieObj = {};

    if (err) throw err;
    if (data.includes(movieTitle)) {
      let txt = data.split('\n');
      txt.forEach(elem => {
        let splitElem = elem.split(':');
        console.log('split', splitElem);
        movieObj[splitElem[0]] = splitElem[1];
      })
    }
    console.log('movieObj', movieObj);
    res.render('pages/searchResult', {movieName : movieTitle, movieDesc : movieObj[movieTitle]});
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});