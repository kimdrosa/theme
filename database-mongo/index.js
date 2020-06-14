var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/theme');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var shortTermSchema = mongoose.Schema({
  user_id : String,
  month : String,
  topArtists : Array,
  topGenres: Array
});

var shortTerm = mongoose.model('shortTerm', shortTermSchema);

var selectAll = function(callback) {
  shortTerm.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

let lastMonth = new shortTerm({
  month : '( 3 , 2020 )',
  topArtists : [
    'The Fall', 
    'Nick Cave And The Bad Seeds',
    'Sun Kil Moon',
    'Cocteau Twins',
    'Parquet Courts'
  ],
  topGenres: [
    'art rock',
    'lo-fi',
    'experimental',
    'post-punk',
    'experimental rock'
  ]
})
let secondtoLastMonth = new shortTerm({
  month : '( 2 , 2020 )',
  topArtists : [
    'Guided By Voices', 
    'Earl Sweatshirt',
    'Glenn Branca',
    'Kurt Vile',
    'Parquet Courts'
  ],
  topGenres: [
    'lo-fi',
    'art rock',
    'experimental',
    'post-punk',
    'experimental rock'
  ]
})
// lastMonth.save().then(() => {
//   console.log('successfully saved lastMonth')
// }).catch((err) => {console.log(err)})

// secondtoLastMonth.save().then(() => {
//   console.log('successfully saved secondtoLastMonth')
// }).catch((err) => {console.log(err)})


module.exports.selectAll = selectAll;
module.exports.shortTerm = shortTerm;