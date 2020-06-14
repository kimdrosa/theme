import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div className= 'month'>
    <h2> {props.monthObj.month} </h2>
    <h4> Top Artists</h4>
    <div className = 'topArtists'> 
    {props.monthObj.topArtists.map(artist => 
    <ListItem item ={artist}/>
    )}</div>
    <h5> Top Genres </h5>
     <div className = 'topGenres'> 
     {props.monthObj.topGenres.map(genre => 
    <ListItem item ={genre}/>
    )}
    </div>
    {/* { props.items.map(item => <ListItem item={item}/>)} */}
  </div>
)

export default List;