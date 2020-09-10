import React, { Component } from 'react';
import axios from 'axios';
import CritterDisplay from './CritterDisplay.js';

//PSEUDOCODE
  // On page load, already load the critters from the current date and time (use that Date class, oh bitch)
  //    - API call to grab all the data and then saved into state
  //    - perhaps three async calls (bugs, fish, sea) that saves to their own state object
  //    - work with the Date class info to figure out a way to reliably predict hemisphere decision 
  //      based on timezone
  //        - "Not your hemisphere?" button that switches the timezone

  // critters are divided up into three sections (design: file folders) that the user can click on and that will bring those results up


//DATA STRUCTURE
  // APP.JS 
  //    - runs the initial api calls on componentDidMount and saves that information to state
  //    - header/nav that displays the Date/Time information
  //    - button to correct hemisphere that will make a new API call on componentDidUpdate
  // BUG/FISH/SEA.JS 
  //    - pulls data from APP.JS state as a prop
  //    - displays that data in a grid
  //    - each object is at first just an image (and name?), onClick it displays more information 
  //      about the critter 
  //    - button to open all critters and display all the information

//STRETCH GOALS
  // button to change date and time/ hemisphere to see critters in different time zones or look ahead
  
  // User Authentication:
  //      user can sign in to see their own saved critters
  //      user can put in their own island name, villager name
  //      user can see their own personal "museum" with a record of everything caught
  //      user can see a wishlist of creatures they want to catch 
  
  // Filter options for each section
  //      filter results based on alphabetical, location, time available
  //      filter results based on if they are disappearing at the end of the month
  
  // Separate out the year round critters and put into their own section
  //      don't include the option to filter based on if they're leaving next month


class App extends Component {
  constructor() {
    super();
    this.state = {
      bugs: [],
      fish: [],
      sea: [],
      dateTime: {},
      month: '',
    }
  }

  // Function that returns the axios promise, can be reused for multiple calls
  apiCall = (keyword) => {
    return axios({
      url: `https://acnhapi.com/v1/${keyword}`,
      method: 'GET',
      dataResponse: 'json'
    })
  }

  // async function that makes all of the api calls at once and sets that data to the state
  getCritters = async (keyword1, keyword2, keyword3) => {
    const [bugObject, fishObject, seaObject] = await Promise.all([this.apiCall(keyword1), this.apiCall(keyword2), this.apiCall(keyword3)])

    const [bugs, fish, sea] = [Object.values(bugObject.data), Object.values(fishObject.data), Object.values(seaObject.data)]

    this.setState({
      bugs,
      fish,
      sea
    })

  }

  getDateInfo = () => {
    const date = new Date();
    const month = date.getMonth()
    console.log(date)

    this.setState({
      dateTime: date,
      month
    })
  }
  
  componentDidMount() {
    // get the initial critter information on page load
    this.getCritters('bugs', 'fish', 'sea')

    // get the Date/Time information on page load
    this.getDateInfo()
  }

  render() {
    return (
      <div>
        <h1>Hey bitch it's me your app!</h1>
        <CritterDisplay displayTitle={'Bugs'} critter={this.state.bugs}/>
        {/* <CritterDisplay displayTitle={'Fish'} critter={this.state.fish} /> */}
      </div>
    );
  }
}

export default App;
