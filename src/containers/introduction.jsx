import React, {Component} from 'react';
import {Card, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
// import Particles from 'react-particles-js';


const styles = {
    card: {
      backgroundColor: "#00bcd4",
      color: "white"
    },
    container: {
      marginTop: "64px",
      textAlign: "center",
    },
    title: {
      fontSize: "175%",
    },
    info: {
      fontSize: "175%",
      margin: "auto",
      maxWidth: "550px",
    },
}

class introduction extends Component{
  render(){
    return(
      <div style={styles.container}>
        <Card style={styles.card}>
          <CardText color="white">
            <div style={styles.title}>
              <h1>ConsenSys North Token</h1>
              <br/>
              <img src="https://image.flaticon.com/icons/svg/185/185286.svg" alt="Toronto" height="150" width="150"/>
              {/*
              <img src="https://lh4.googleusercontent.com/-JyqgXDO42wo/AAAAAAAAAAI/AAAAAAAAADA/b_5Cla6h8Ow/photo.jpg" alt="Toronto" height="150" width="150"/>
              */}
              <br/>
              <h3>Grow the Community. Collect the Tokens. Redeem for Awesome Swag</h3>
            </div>
            <br/>
            <Divider/>
            <br/><br/>
            <div>
              <h3 style={styles.info}>We are experimenting a company incentive token with the employees in Toronto</h3>
            </div>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default introduction;
