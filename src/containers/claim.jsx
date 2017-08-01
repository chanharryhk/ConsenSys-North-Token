import React, { Component } from 'react';
import HumanStandardTokenContract from '../../build/contracts/HumanStandardToken.json'
import getWeb3 from '../utils/getWeb3';

import {Card, CardTitle} from 'material-ui/Card';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {Step, Stepper, StepLabel, StepContent,} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import {cyan500} from 'material-ui/styles/colors';

import Particles from 'react-particles-js';

const coder = require('../../node_modules/web3/lib/solidity/coder');
const Tx = require('ethereumjs-tx');
const privateKey = new Buffer('9a0b2f1c2497269a9be6badfdbbaadee668928c959ced4ecbfd6cc6c8f88a7f5', 'hex')

const styles = {
  underlineStyle: {
    borderColor: cyan500,
  },
  floatingLabelStyle: {
    color: cyan500,
  },
  cardTitle: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "2em",
    color: cyan500,
  },
  wrap: {
    padding: "5%",
    // position: "relative",
  },
  particlesContainer: {

  },
  particles: {
    position: "absolute",
  },
  particlesParam: {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 1000
        }
      },
      color: {
        value: cyan500
      },
      line_linked: {
        shadow: {
          enable: true,
          color: cyan500,
          blur: 5
        }
      }
    }
  },
};
class claim extends Component {

  constructor(props) {
    super(props);
    const self = this;
    this.state = {
      web3: null,
      value: 1,
      finished: false,
      stepIndex: 0,
      tokensClaimable: 0,
      disabledButton: true,
      open: false,
      humanStandardTokenInstance: {},
      functionData: '',
      fromAddressHex: '',
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
        console.log(this.state.web3);
        console.log(instance);
        // console.log("abi", this.state.web3.eth.contract(HumanStandardTokenContract.abi).at(instance.address))
        this.state.web3.eth.getTransaction("0x331c249ed094c39949728b4629ad6eb6606f7c1d501396aa1ca0dccd8d66ba07", (err, result) => {
          console.log("Contract Deployment / getting the contract deployer's address", result);
          this.setState({fromAddressHex: result.from})
        })
        this.state.web3.eth.getTransaction("0xf9ef5485876ded7cc308f2ea69f5e88d0a276866ec7d55a497a8d2c859bb1c1c", (err, result) =>{
          console.log("\"Working\" Claim's TX Data", result);
          var decoded = coder.decodeParams(["address", "uint256"], "000000000000000000000000f4ef48df280ab3a5fa637244ff522e237a63fd8100000000000000000000000000000000000000000000000000000000000000c8")
          console.log(decoded);
        })
        this.setState({
          humanStandardTokenInstance: instance,
        });
      })
    })
    console.log(coder);
    var decoded = coder.decodeParams(["address", "address", "uint256"], "0x23b872dd000000000000000000000000caefe1e1eec5247d7a0583d4577fbba966d3d446000000000000000000000000f4ef48df280ab3a5fa637244ff522e237a63fd8100000000000000000000000000000000000000000000000000000000000000c8")
    console.log(decoded);
    // 0x23b872dd000000000000000000000000caefe1e1eec5247d7a0583d4577fbba966d3d446000000000000000000000000f4ef48df280ab3a5fa637244ff522e237a63fd8100000000000000000000000000000000000000000000000000000000000000c8
  }

  handleMenuChange = (event, index, value) => {
    this.setState({value});
    this.setState({disabledButton: false})
    if (index === 0){
      this.setState({tokensClaimable: 10})
    }else if (index === 1){
      this.setState({tokensClaimable: 200})
    }else if (index === 2){
      this.setState({tokensClaimable: 20})
    }
  }

  handleChange(event){
    this.setState({[event.target.id]: event.target.value});
    // console.log(event.target.id);

    if(this.state.web3.isAddress(event.target.value)){
      this.setState({disabledButton: false});
    } else {
      this.setState({disabledButton: true});
    }
  }

  handleNext = () => {
    const {stepIndex} = this.state
    if (this.state.stepIndex === 1){
      this.setState({disabledButton: false})
    }else{
      this.setState({disabledButton: true,})
    }
    this.setState({stepIndex: stepIndex + 1,});
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1,
        disabledButton: true,
      });
    }
  };
  handleSubmit = () => {
    const {stepIndex} = this.state
    let rawData = this.state.humanStandardTokenInstance.contract.transfer.getData(this.state.employeeAddress , this.state.tokensClaimable)
    console.log(rawData);
    // var encodedFunction = this.state.web3.sha3('transferFrom(address,address,uint256)').slice(0, 10)
    // console.log(encodedFunction);
    // var encodedParam = coder.encodeParams(["address", "address", "uint256"], [this.state.fromAddressHex, this.state.employeeAddress, this.state.tokensClaimable]);
    // console.log(encodedParam);
    // var decoded = coder.decodeParams(["address", "address", "uint256"], encodedParam)
    // console.log(decoded);

    //I do not know why the following "getData" function does not work! Returns an error
    //let data = this.state.humanStandardTokenInstance.transferFrom.getData(this.state.fromAddressHex, this.state.employeeAddress, this.state.tokensClaimable);
//GAS PRICE???
    // this.state.humanStandardTokenInstance.contract.transferFrom.estimateGas(this.state.fromAddressHex, this.state.employeeAddress , this.state.tokensClaimable, (err, gas) => {
    //   console.log(gas);
    // })

    this.state.web3.eth.getTransactionCount(this.state.fromAddressHex, (err, result) => {
      console.log(result);
      var nonce = this.state.web3.toHex(result)
      console.log(nonce);
      var gasLimitHex = this.state.web3.toHex(3000000);
      console.log();
      var rawTx = {
        nonce: 8,
        gasPrice: '0x09184e72a000',
        gasLimit: gasLimitHex,
        to: this.state.employeeAddress,
        value: '0x00', //Sending 0 Ether because I am just trying to transfer over tokens
        data: rawData,
      }
      var tx = new Tx(rawTx);
      tx.sign(privateKey);
      var serializedTx = tx.serialize();
      this.state.web3.eth.sendRawTransaction(serializedTx.toString('hex'), function(err, hash) {
        console.log(err);
        if (!err)
          console.log(hash);
      });
    })


    this.setState({
      open: true,
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  }

  renderStepActions(step) {
    const {stepIndex} = this.state;

    return (
      <div style={{margin: '12px 0'}}>
        {stepIndex >= 2 ?(
          <span>
            <RaisedButton
              label={'Submit'}
              disableTouchRipple={true}
              disableFocusRipple={true}
              primary={true}
              onTouchTap={this.handleSubmit}
              style={{marginRight: 12}}
            />
            {/*
            <Snackbar
              open={this.state.open}
              message="XXX was added to your balance"
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
            */}
          </span>
        ) : (
          <RaisedButton
            label={'Next'}
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            onTouchTap={this.handleNext}
            style={{marginRight: 12}}
            disabled={this.state.disabledButton}
          />
        )}
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    );
  }
  render() {
    const {finished, stepIndex} = this.state;

    return (
      <div style={{position: "relative"}}>
        <Card>
          <div style={styles.wrap}>
            {/*
              <Particles style={styles.particles} params={styles.particlesParam}/>
            */}
            <CardTitle title="CLAIM TOKENS" titleStyle={styles.cardTitle}/>
            Step: {this.state.stepIndex}
            <br/>
            Menu: {this.state.value}
            <br/>
            {this.state.employeeAddress}
            <div style={{maxWidth: 500, maxHeight: 400, margin: 'auto'}}>
              <Stepper activeStep={stepIndex} orientation="vertical">
                <Step>
                  <StepLabel>What did you accomplish today?</StepLabel>
                  <StepContent>
                    <DropDownMenu
                      value={this.state.value}
                      onChange={this.handleMenuChange}
                      autoWidth={false}
                    >
                      <MenuItem value={1} primaryText="Completed A Survey" />
                      <MenuItem value={2} primaryText="Spoke at a Local Event" />
                      <MenuItem value={3} primaryText="Came into the Office" />
                    </DropDownMenu>
                    <div>
                      <p>
                        You are eligible for <b>{this.state.tokensClaimable}</b> tokens
                      </p>
                    </div>
                    {this.renderStepActions(0)}
                  </StepContent>
                </Step>
                <Step>
                  <StepLabel>Token Address</StepLabel>
                  <StepContent>
                    <TextField
                      floatingLabelText="0x | Address"
                      floatingLabelStyle={styles.floatingLabelStyle}
                      floatingLabelFocusStyle={styles.floatingLabelStyle}
                      underlineFocusStyle={styles.underlineStyle}
                      fullWidth={true}
                      type="text"
                      id="employeeAddress"
                      onChange={this.handleChange}
                    />
                    {this.renderStepActions(1)}
                  </StepContent>
                </Step>
                <Step>
                  <StepLabel>Confirmation</StepLabel>
                  <StepContent>
                    {this.renderStepActions(2)}
                  </StepContent>
                </Step>
              </Stepper>
            </div>
            {finished && (
            <div style={{margin: '20px 0', textAlign: 'center'}}>
              Would you like to make another claim?
              <br/><br/>
              <RaisedButton label="Hell Ya" primary={true}
                onTouchTap={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}
              />
          </div>
          )}
          </div>
        </Card>
      </div>
    );
  }
}

export default claim;
