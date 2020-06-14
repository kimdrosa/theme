var express = require('express');
var bodyParser = require('body-parser');

var items = require('../database-mongo');
var mongoose = require('mongoose');

var app = express();


app.use(express.static(__dirname + '/../react-client/dist'))
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())



app.get('/api/shortTerm', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/api/shortTerm', function (req, res) {
let params = req.body;
let model = items.shortTerm;
// let query = items.shortTerm.find();
// model.exists({month: params.month}, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });
// //check if that month is already stored in the database, if so then overwrite it with new data
//   if(items.shortTerm.find(params.month)){
    // items.shortTerm.update(params);
//     //if not them write a new entry
//   } else {
    let newEntry = new  items.shortTerm(params);
  
     newEntry.save().then(() => {console.log('succesfully stored: ' + newEntry)})
     .catch((err) => {console.log(err)})
//   }
});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

