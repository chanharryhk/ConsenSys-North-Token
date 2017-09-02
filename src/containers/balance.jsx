import React, {Component} from 'react';
import HumanStandardTokenContract from '../../build/contracts/HumanStandardToken.json'
import {Card, CardText, CardTitle} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import getWeb3 from '../utils/getWeb3';

import {amber400, grey50} from 'material-ui/styles/colors';
import ConsenSysLogo from '../images/consensysLogo.svg';

const styles = {
    card: {
      backgroundColor: grey50,
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
      color: amber400,
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
      borderColor: amber400,
    },
    floatingLabelStyle: {
      color: amber400,
    },
    textFieldStyle: {
      width: "50%",
    },
    buttonStyle: {
      margin: 12,
    },
}

class balance extends Component{
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
          this.setState({message: 'You just have '+ result.c + ' tokens'})
          // this.setState({message: 'Shhhh don\'t let Joe find out that you have '+ result.c+ ' tokens ಠ~ಠ'})
        }else{
          this.setState({message: 'You have '+ result.c +' ConsenSys Tokens!'})
        }
      })
    }else if(this.state.employeeAddress === undefined || this.state.employeeAddress === ''){
      this.setState({message: 'You haven\'t entered anything'})
    }else{
      this.setState({message: this.state.employeeAddress + ' is not a valid ethereum address'})
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
            <CardTitle title="TOKEN BALANCE" titleStyle={styles.cardTitle}/>
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
            <RaisedButton label="CHECK" labelColor={amber400} style={styles.buttonStyle} onTouchTap={this.checkBalance.bind(this)}/>
            <Dialog
              title="ConsenSys North"
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              {this.state.message}
            </Dialog>
          </div>
          <CardText color={amber400}>
            © 2017 Shout Outs A ConsenSys Formation
          </CardText>
        </Card>
      </div>
    );
  }
}

export default balance;
