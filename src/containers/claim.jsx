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
        console.log(instance);
        this.state.web3.eth.getTransaction("0x0650c1be6f5c0f1f33378826b3a152f79af2b590444c5bcd18a9d1385a449402", (err, result) => {
          console.log("adf", result)
          this.setState({fromAddressHex: result.from})
        })
        this.setState({
          humanStandardTokenInstance: instance,
        });
      })
    })

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
      console.log(event.target.value);
      this.setState({disabledButton: false});
    } else {
      this.setState({disabledButton: true});
      console.log("wrong");
    }
  }

  handleNext = () => {
    const {stepIndex} = this.state
    console.log(this.state.stepIndex);
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
    // this.state.humanStandardTokenInstance.transferFrom()
    let data = this.state.humanStandardTokenInstance.transferFrom
    // getData(this.state.fromAddressHex, this.state.employeeAddress, this.state.tokensClaimable);
    console.log("Here", data);
    this.setState({
      // open: true,
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  }
  // handleTouchTap = () => {
  //   this.setState({
  //     open: true,
  //   });
  // };
  // handleRequestClose = () => {
  //   this.setState({
  //     open: false,
  //   });
  // };

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
