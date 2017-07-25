import React, {Component} from 'react';
import pylon from '../images/pylon.png'

const donationsBarStyle = {
  zIndex: 3,
  backgroundColor: "#4885ed",
  fontFamily: "Helvetica Neue, Arial ,sansSerif",
  left: 0,
  height: "100%",
  display: "flex",
  verticalAlign: "center",
}

class donations extends Component{
  render(){
    return(
      <section>
        <div style={donationsBarStyle}>
          <h1>Donations</h1>

          <h1>Website Still Under Construction</h1>
          <img src={pylon} alt="github" height="75" width="75"/>
          
        </div>
      </section>
    );
  }
}

export default donations;
