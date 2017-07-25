import React, { Component } from 'react';
import {Card, CardTitle} from 'material-ui/Card';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {Step, Stepper, StepLabel, StepContent,} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
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
    this.state = {
      value: 1,
      finished: false,
      stepIndex: 0,
      tokensClaimable: 0,
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  handleNext = () => {
    const {stepIndex} = this.state;
    // const {tokensClaimable} = this.state;
    switch (this.state.value){
      case 1:
        this.setState({tokensClaimable: 10});
        break;
      case 2:
        this.setState({tokensClaimable: 500});
        break;
      case 3:
        this.setState({tokensClaimable: 20});
        break;
      default:
        break;
    }
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions(step) {
    const {stepIndex} = this.state;
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 2 ? 'Submit' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
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
            <div style={{maxWidth: 500, maxHeight: 400, margin: 'auto'}}>
              <Stepper activeStep={stepIndex} orientation="vertical">
                <Step>
                  <StepLabel>What did you accomplish today?</StepLabel>
                  <StepContent>
                    <DropDownMenu
                      value={this.state.value}
                      onChange={this.handleChange}
                      autoWidth={false}
                    >
                      <MenuItem value={1} primaryText="Completed A Survey" />
                      <MenuItem value={2} primaryText="Spoke at a Local Event" />
                      <MenuItem value={3} primaryText="Came into the Office" />
                    </DropDownMenu>
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
                    />
                    {this.state.tokensClaimable}
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
          </div>
        </Card>
      </div>
    );
  }
}

export default claim;
