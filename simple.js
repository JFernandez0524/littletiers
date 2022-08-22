var low = require('lowdb');
const { write } = require('lowdb/adapters/FileSync');
var fs = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db = low(adapter);

// init the data store
// ---------------------------
db.defaults({ posts: [] }).write();

// add post
// ----------------------------

// db.get('posts')
//   .push({ id: 5, title: 'Unpublished post 1', published: false })
//   .write();
// db.get('posts')
//   .push({ id: 6, title: 'Unpublished post 2', published: false })
//   .write();

console.log(db.get('posts').value());

// count posts
// ----------------------------
console.log('Number of posts :' + db.get('posts').size().value());

// find all posts ids
// ----------------------------
console.log('post ids: ' + db.get('posts').map('id').value());

// all matches of published false
// ----------------------------
// YOUR CODE

console.log(
  'all matches of published false: ' +
    JSON.stringify(db.get('posts').filter({ published: false }).value())
);

// find post with published false
// ----------------------------
// YOUR CODE
console.log(
  'find post with published false: ' +
    JSON.stringify(db.get('posts').find({ published: false }).value())
);
