import React, {Component} from 'react';
import HumanStandardTokenContract from '../../build/contracts/HumanStandardToken.json'
import getWeb3 from '../utils/getWeb3';

import {GridList, GridTile} from 'material-ui/GridList';
import {Card, CardTitle} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

import Dinner from '../images/dinner.jpg';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    height: 450,
    overflowY: 'auto',
  },
  card: {
    backgroundColor: "#00bcd4",
    color: "white"
  },
  wrap: {
    padding: "5%",
  },
  cardTitle: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "2em",
    textAlign: "left",
    color: "white",
  },
};

const tilesData = [
  {
    img: 'https://www.hdwallpapers.in/walls/2014_lamborghini_huracan_lp610_4-wide.jpg',
    item: 'Lamborghini',
    id: 0,
    price: 10000,
    featured: true,
    description: 'You wouldn\'t download a lambo would you?',
  },
  {
    img: 'http://www.4freephotos.com/medium/batch/Raining--on-umbrella813.jpg',
    item: 'Sick Day',
    id: 1,
    price: 1000,
    description: 'I don\'t mind spending every day. Out on your corner in the pouring rain.',
  },
  {
    img: 'http://collectwall.com/wp-content/uploads/2016/10/Dog-Run-Autumn-New-Wallpaper.jpg',
    item: 'Doggo',
    id: 2,
    price: 5000,
    description: 'Adopting an abanbonded neopet',
  },
  {
    img: Dinner,
    item: 'Dinner w/ Joe',
    price: 1000000,
    id: 3,
    featured: true,
    description: 'Dinner with the most handsome man in the space.',
  },
  {
    img: 'https://cdn.daysoftheyear.com/wp-content/images/paperclip-day-e1462623051825.jpg',
    item: 'A Few Paper Clips',
    id: 4,
    price: 43,
    description: 'A physical \'CHAIN\' building starter kit for bitcoin-ers who can\'t handle Ethereum',
  },
  {
    img: 'https://www.stevenaitchison.co.uk/wp-content/uploads/paperclip.jpg',
    item: '1 Paper Clip',
    id: 5,
    price: 10,
    description: 'Why would you even click on this? Everything is digital',
  },
];

class redeem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      open: false,
      item: '',
      itemPrice: 0,
      id: 0,
      calendarVisibility: 'none',
      itemDescription: '',
      fromAddressHex: '',
    };
    this.handleItemClick = this.handleItemClick.bind(this)
  }
  componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({
        web3: results.metaMaskWeb3
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
      console.log(accounts);
      HumanStandardToken.deployed()
      .then((instance) => {
        this.state.web3.eth.getTransaction("0x2619f311beaedced98fc7cfc887704e2be3813274c0e6f74bbbf138d2a433137", (err, result) => {
          this.setState({fromAddressHex: result.from})
        })
        this.setState({humanStandardTokenInstance: instance})
      })
    })
    console.log(this.state.web3.eth);
  }

  handleSubmit = () => {
    console.log('User Address', this.state.web3.eth.accounts[0]);
    console.log('Price', this.state.itemPrice);
    console.log(this.state.humanStandardTokenInstance.contract);
    let rawData = this.state.humanStandardTokenInstance.contract.transfer.getData(this.state.fromAddressHex , this.state.itemPrice)

    console.log(rawData);
    this.state.web3.eth.sendTransaction({
      from: this.state.web3.eth.accounts[0],
      to: "0x82c2c26111ee784c8ecdacd523fb315587f0b665", //Contract Address
      value: '0x00',
      data: rawData
    }, function(err, transactionHash) {
      console.log(err);
      if (!err)
        console.log(transactionHash); // "0x7f9fade1c0d57a7af66ab4ead7c2eb7b11a91385"
    });
  }

  handleItemClick = (item, itemPrice, id, description) => {
    this.setState({
      open: true,
      item: item,
      itemPrice: itemPrice,
      itemID: id,
      itemDescription: description,
    });
    if (id === 3){
      this.setState({
        calendarVisibility: 'inline'
      })
    } else {
      this.setState({
        calendarVisibility: 'none'
      })
    }
  }

  handleClose = () => {
    this.setState({open: false});
  };

  render(){
    return(
      <div style={styles.root}>
        <Card style={styles.card}>
          <div style={styles.wrap}>
            <CardTitle title="GALLERY" titleStyle={styles.cardTitle}/>
            <GridList
              cols={2}
              cellHeight={200}
              padding={10}
              style={styles.gridList}
            >
              {tilesData.map((tile) => (
                <GridTile
                  style={{cursor: 'pointer'}}
                  key={tile.img}
                  title={tile.item}
                  subtitle={<span>{tile.price} Tokens</span>}
                  titlePosition="top"
                  titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                  cols={tile.featured ? 2 : 1}
                  rows={tile.featured ? 2 : 1}
                  onTouchTap={() => this.handleItemClick(tile.item, tile.price, tile.id, tile.description)}
                >
                  <img src={tile.img} alt="item"/>
                </GridTile>
              ))}
            </GridList>
            <Dialog
              title={this.state.item}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              {this.state.itemDescription}
              <p>Cost: {this.state.itemPrice} tokens</p>
              <p>Item ID: {this.state.itemID}</p>
              <DatePicker hintText="Pick a date" mode="landscape" style={{display: this.state.calendarVisibility}}/>
              <RaisedButton
                label={'Purchase'}
                disableTouchRipple={true}
                disableFocusRipple={true}
                primary={true}
                onTouchTap={this.handleSubmit}
                style={{marginRight: 12}}
              />
            </Dialog>
          </div>
        </Card>
      </div>
    );
  }
}

export default redeem;
