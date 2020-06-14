import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List.jsx';
import axios from 'axios';
import Spotify from 'spotify-web-api-js';
import bluebird from 'bluebird';


var date = new Date;
var spotifyWebApi = new Spotify()
spotifyWebApi.setPromiseImplementation(bluebird);
class App extends React.Component {
  constructor(props) {
    super(props);
    let params = this.getHashParams();
    this.state = { 
      user_id : '',
      topArtistNames : [],
      topGenres : [],
      month : '( ' + (date.getMonth() + 1) + ' , ' + date.getFullYear() + ' )',
      months : []
    }
    if(params.access_token){
      spotifyWebApi.setAccessToken(params.access_token);
    }
    this.getTopGenres = this.getTopGenres.bind(this);
    this.getAllMonths = this.getAllMonths.bind(this);
    this.getUserId = this.getUserId.bind(this);
  }

getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  componentDidMount() {
  
    spotifyWebApi.getMyTopArtists({limit : 5, time_range : 'short_term'})
    .then((response) => {
      for (var key in response.items) {
        this.state.topArtistNames.push(response.items[key].name);
        for (var genreKey in response.items[key].genres) {
          this.state.topGenres.push(response.items[key].genres[genreKey])
        }
      }
      this.getTopGenres(this.state.topGenres);
      this.getUserId();
      this.setState({
        topArtists : response.items,
     
      })



      axios.post('/api/shortTerm', {
        user_id : this.state.user_id,
        topArtists : this.state.topArtistNames,
        topGenres : this.state.topGenres,
        month : this.state.month
      }).then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })
    })
    .catch((err) => {console.log(err)})
   
    this.getAllMonths();

  }
  
  getAllMonths() {
    axios.get('/api/shortTerm')
    .then((response) => {
      this.setState({
        months : response.data
      })
    })
    .catch((err) => {console.log(err)})

  }


  getTopGenres(genres) {
    let genreObj = {};
    let topGenres = [];
    for (var i = 0; i < genres.length; i++) {
      if (genreObj[genres[i]] === undefined) {
        genreObj[genres[i]] = 1;
      } else {
        genreObj[genres[i]] += 1;
      }
    }
    let sortedgenres = Object.values(genreObj).sort();
    let mostFrequent = sortedgenres.slice(sortedgenres.length - 6, sortedgenres.length - 1);
    
    for (var key in genreObj) {
      if (mostFrequent.includes(genreObj[key])){
        topGenres.push(key);
      }
    }
    this.setState({
      topGenres : topGenres
    })
  }


  getUserId () {
    spotifyWebApi.getMe()
    .then((response) => { console.log('USER : ', response.id)
  })
    .catch((err) => {console.log(err)})

  }

  render () {

    let monthObj = {
      month : this.state.month,
      topArtists :  this.state.topArtistNames,
      topGenres : this.state.topGenres
    }

    let monthObj2 = {
     month : '( 3 , 2020 )',
    topArtists : [

      'The Fall', 
      'Nick Cave And The Bad Seeds',
      'Sun Kil Moon',
      'Cocteau Twins',
      'Parquet Courts'
    ],
    topGenres: [
      'lo-fi',
      'art rock',
      'experimental',
      'post-punk',
      'experimental rock'
    ]
  }

  let monthObj3 = {
    
      month : '( 2 , 2020 )',
      topArtists : [
        
        'Guided By Voices', 
        'Earl Sweatshirt',
        'Glenn Branca',
        'Kurt Vile',
        'Parquet Courts'
      ],
      topGenres: [
        'art rock',
        'lo-fi',
        'experimental',
        'post-punk',
        'experimental rock'
      ]
    
  }
    if(this.state.months[0] != undefined) {
    return (<div className = 'appContainer'>
      <h1>theme</h1>
      {this.state.months.map((month) => 
      <List monthObj = {month}/>
      )
    }
   
    </div>)
    } else return (
      <div>Please Wait... </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));