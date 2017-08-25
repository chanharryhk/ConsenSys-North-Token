import React, { Component } from 'react'
import HumanStandardTokenContract from '../build/contracts/HumanStandardToken.json'
import getWeb3 from './utils/getWeb3'

import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';

import Introduction from './containers/introduction.jsx';
import Claim from './containers/claim.jsx';
import Redeem from './containers/redeem.jsx';
import Balance from './containers/balance.jsx';

const styles = {
  appBar: {
    overflow: 'hidden',
    position: 'fixed',
    top: 0,
    boxShadow: null,
  },
  tabs: {
    width: '100%',
  },
  buttons:{
    marginRight: '1em',
    marginLeft: '1em',
  },
};


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    document.body.style.margin = 0;
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const HumanStandardToken = contract(HumanStandardTokenContract)
    HumanStandardToken.setProvider(this.state.web3.currentProvider)


    // Declaring this for later so we can chain functions on SimpleStorage.
    // var humanStandardTokenInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      // console.log(accounts);
    })
  }
  /*
  <img src={ConsenSysLogo} alt="ConsenSys Logo" height="60" width="208"/
  */

  // scrollTo = () => {
  //   const node = ReactDOM.findDOMNode(this.Redeem);
  //   node.scrollIntoView({ block: "end", behavior: "smooth" });
  //   console.log(node);
  // }

  render() {
    return (
      <div className="App">
        <div>
          <AppBar
            style={styles.appBar}
            title="ConsenSys North Tokens eh?"
            iconElementRight={
              <Tabs onChange={this.onChangeTabs} style={styles.tabs}>
                <Tab buttonStyle={styles.buttons} label="Vision" />
                <Tab buttonStyle={styles.buttons} label="Claim"  />
                <Tab buttonStyle={styles.buttons} label="Redeem" />
                <Tab buttonStyle={styles.buttons} label="Balance" />
              </Tabs>
            }
            showMenuIconButton={false}
          />
        </div>
        <Introduction />
        <Claim id="Claim"/>
        <Redeem/>
        <Balance/>
        {/*
          ref={(el) => { this.Redeem = el; }}
        */}
      </div>
    );
  }
}

export default App
