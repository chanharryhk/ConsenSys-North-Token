import React, {Component} from 'react';
import HumanStandardTokenContract from '../../build/contracts/HumanStandardToken.json'
import {Card, CardText, CardTitle} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import getWeb3 from '../utils/getWeb3';

import Dinner from '../images/dinner.jpg';

const styles = {
    card: {
      backgroundColor: "#00bcd4",
      color: "white"
    },
    container: {
      textAlign: "center",
    },
    title: {
      fontSize: "175%",
    },
    cardTitle: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "2em",
      textAlign: "left",
      color: "white",
    },
    paperStyle: {
      height: 200,
      width: 300,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    },
    wrap: {
      padding: "5%",
    },
    underlineStyle: {
      borderColor: "white",
    },
    floatingLabelStyle: {
      color: "white",
    },
    textFieldStyle: {
      width: "50%",
    },
    buttonStyle: {
      margin: 12,
    },
}

class redeem extends Component{
  constructor(props) {
    super(props);
    const self = this;
    self.state = {
      open: false,
      value: '',
      web3: null,
      message: '',
      humanStandardTokenInstance: {},
      shadow: 1,
    };
    self.handleChange = self.handleChange.bind(self);
  }
  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract(){
    const contract = require('truffle-contract')
    const HumanStandardToken = contract(HumanStandardTokenContract)
    HumanStandardToken.setProvider(this.state.web3.currentProvider)

    this.state.web3.eth.getAccounts((error, accounts) => {
      HumanStandardToken.deployed()
      .then((instance) => {
        this.setState({humanStandardTokenInstance: instance})
      })
    })
  }

  handleChange(event){
    this.setState({[event.target.id]: event.target.value});
  }

  handleClose = () => {
    this.setState({open: false});
  };

  checkBalance(){
    if(this.state.web3.isAddress(this.state.employeeAddress)){
      this.state.humanStandardTokenInstance.balanceOf.call(this.state.employeeAddress)
      .then((result) => {
        if(result.c[0] === 0){
          this.setState({message: 'Ahhhhh you just entered your private key!...Just kidding you just have '+ result.c + ' tokens LOL'})
          // this.setState({message: 'Shhhh don\'t let Joe find out that you have '+ result.c+ ' tokens ಠ~ಠ'})
        }else{
          this.setState({message: 'Eyyyooo! You got '+ result.c +' ConsenSys North Tokens! ☜(ﾟヮﾟ☜)'})
        }
      })
    }else if(this.state.employeeAddress === undefined || this.state.employeeAddress === ''){
      this.setState({message: 'Silly employee you havent entered anything ¯\\_(ツ)_/¯'})
    }else{
      this.setState({message: this.state.employeeAddress + ' is not an ethereum address... ummm do you even work at ConsenSys? ಠ_ಠ'})
      // this.setState({message: 'it's kinda hard information out of an invalid address})
    }
    this.setState({open: true});
  }
  onMouseOver = () => {
    this.setState({ shadow: 4 });
  }
  onMouseOut = () => {
    this.setState({ shadow: 1 });
  }
  render(){
    return(
      <div style={styles.container}>
        <Card style={styles.card}>
          <div style={styles.wrap}>
            <CardTitle title="CONSENSYS MERCH" titleStyle={styles.cardTitle}/>
              <TextField
                floatingLabelText="0x | Address"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelStyle}
                underlineFocusStyle={styles.underlineStyle}
                style={styles.textFieldStyle}
                type="text"
                id="employeeAddress"
                onChange={this.handleChange}
              />
            <br/>
            <RaisedButton label="CHECK" labelColor="#00BCD4" style={styles.buttonStyle} onTouchTap={this.checkBalance.bind(this)}/>
            <Dialog
              title="ConsenSys North"
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              {this.state.message}
            </Dialog>
            {/*
              <CardTitle title="CONSENSYS MERCH" titleStyle={styles.cardTitle}/>
              <Paper
                id="first"
                style={styles.paperStyle}
                zDepth={this.state.shadow}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
                children={
                  <div>
                    <p>Bobblehead Joe</p>
                    <img src="https://daks2k3a4ib2z.cloudfront.net/576c036456781b9d0fb18681/57a3fdfa48ec317e4b0ecbf4_lubin_joseph.png" alt="Blast Off!" height="150" width="150"/>
                  </div>
                }
              />
              <Paper
                id="second"
                style={styles.paperStyle}
                zDepth={this.state.shadow}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
                children={
                  <div>
                    <p>Candle Light Dinner With Joe</p>
                    <img src={Dinner} alt="Dinner!" height="200" width="300"/>
                  </div>
                }
              />
              <Paper id="third" style={styles.paperStyle} zDepth={this.state.shadow} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}/>
              <Divider/>
            */}
          </div>
        </Card>
      </div>
    );
  }
}

export default redeem;
