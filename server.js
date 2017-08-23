
const express = require('express')
const bodyParser= require('body-parser')
const app = express()
// const MongoClient = require('mongodb').MongoClient

var MongoClient = require('mongodb').MongoClient
, assert = require('assert');

var url = 'mongodb://localhost:27017/poll';
// Use connect method to connect to the Server 
var db

MongoClient.connect(url, (err, database) =>{
//   assert.equal(null, err);
//   db = database
//   console.log("Connected correctly to server");
if (err) return console.log(err)
    db = database
    app.listen(3000, () => {
      console.log('listening on 3000')
    })
 
 // db.close();
});
app.use(bodyParser.urlencoded({extended: true}))
//app.use('/api', api); // redirect API calls
// app.use('/', express.static(__dirname + '/www')); // redirect root
// app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS

// app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
// app.listen(3000, function() {
//     console.log('listening on 3000')
//   })
  app.get('/', (req, res) => {
 
   //  
   var cursor = db.collection('quotes').find()
    db.collection('quotes').find().toArray(function(err, results) {
 // console.log(results)
  res.sendFile(__dirname + '/index.html')
   });
  })
  app.post('/quotes', (req, res) => {
    //var input = JSON.parse(JSON.stringify(req.body));
   // collection.save({_id:"abc", user:"David"},{w:1}, callback)
  
   var count=0;
   var r=req.body.Question;
  // console.log(r);
var a = {
    "Question":r,
    "Option1":{
        "Option1":req.body.Option1,
        "Count":count
    },
    "Option2":{
        "Option1":req.body.Option2,
        "Count":count
    },
    "Option3":{
        "Option1":req.body.Option3,
        "Count":count
    }
}

    db.collection('quotes').save(a, (err, result) => {
        
        if (err) return console.log(err)
    
        console.log('saved to database')
        console.log(result);
      //  var id = result._id;
        // res.render(__dirname + "/test.html", {id:id});
      //  res.sendFile(__dirname + "/test.html", {id:id});
      //  console.log("-------");
       
        //res.redirect('/')
      })
  })