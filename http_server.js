// add http server
// -----------------------
const express = require('express');
const app = express();
var low = require('lowdb');
var fs = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db = low(adapter);

// configure express to serve static files from public directory
// ------------------------------------------------------------------
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// init the data store
app.use(function (res, req, next) {
  db.defaults({ posts: [] }).write();
  next();
});

// list posts
app.get('/data', function (req, res) {
  res.send(db.get('posts').value());
});

// ----------------------------------------------------
// add post - test using:
//      curl http://localhost:3000/posts/ping/1/false
// ----------------------------------------------------
app.get('/posts/:title/:id/:published', function (req, res) {
  const post = {
    id: Number(req.params.id),
    title: req.params.title,
    published: req.params.published === 'true' ? true : false,
  };
  db.get('posts').push(post).write();
  console.log(db.get('posts').value());
  res.send(db.get('posts').value());
});

// ----------------------------------------------------
// filter by published state - test using:
//      curl http://localhost:3000/published/true
// ----------------------------------------------------
app.get('/published/:boolean', function (req, res) {
  const publishedFilter = {
    published: req.params.boolean === 'true' ? true : false,
  };
  console.log(publishedFilter);
  res.send(db.get('posts').filter(publishedFilter).value());
});

// ----------------------------------------------------
// update published value - test using:
//      curl http://localhost:3000/published/1/true
// ----------------------------------------------------
app.get('/published/:id/:boolean', function (req, res) {
  // YOUR CODE
  res.send(
    db
      .get('posts')
      .find({ id: Number(req.params.id) })
      .assign({ published: req.params.boolean === 'true' ? true : false })
      .write()
  );
  console.log(db.get('posts').value());
});

// ----------------------------------------------------
// delete entry by id - test using:
//      curl http://localhost:3000/delete/5
// ----------------------------------------------------
app.get('/deletePost/:id/', function (req, res) {
  const id = Number(req.params.id);
  console.log('Getting Post To Delete');
  res.send(db.get('posts').remove({ id: id }).write());
});

//delete all data
app.get('/deleteAll', function (req, res) {
  db.get('posts').remove().write();
  res.status(200).send();
});

// start server
// -----------------------
app.listen(3000, function () {
  console.log(`server running on port 3000!`);
});
