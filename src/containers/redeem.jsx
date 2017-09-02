import React, {Component} from 'react';
import HumanStandardTokenContract from '../../build/contracts/HumanStandardToken.json'
import getWeb3 from '../utils/getWeb3';

import {GridList, GridTile} from 'material-ui/GridList';
import {Card, CardTitle} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import {amber400, yellow800} from 'material-ui/styles/colors';

import Dinner from '../images/dinner.jpg';
import Sweater from '../images/sweater.jpg';
import Movie from '../images/movie.jpg';
import GiftCard from '../images/giftcard.jpg';
import Computer from '../images/computer.jpg';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    height: 550,
    overflowY: 'auto',
  },
  card: {
    backgroundColor: amber400,
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
  tileTitle: {
    color: yellow800,
  },
};

const tilesData = [
  {
    img: Dinner,
    item: 'Sushi Party',
    id: 0,
    price: 250000,
    featured: true,
    description: 'It\'s party time! Contribute points towards this office event',
  },
  {
    img: Movie,
    item: 'Movie Ticket',
    id: 1,
    price: 100,
    description: 'Don\'t forget the popcorn!',
  },
  {
    img: GiftCard,
    item: 'Gift Card',
    id: 2,
    price: 250,
    description: 'Treat yourself to something nice!',
  },
  {
    img: Sweater,
    item: 'Sweater',
    price: 500,
    id: 3,
    featured: true,
    description: 'Quality ConsenSys merchandise',
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
      HumanStandardToken.deployed()
      .then((instance) => {
        this.state.web3.eth.getTransaction("0x2619f311beaedced98fc7cfc887704e2be3813274c0e6f74bbbf138d2a433137", (err, result) => {
          this.setState({fromAddressHex: result.from})
        })
        this.setState({humanStandardTokenInstance: instance})
      })
    })
  }

  handleSubmit = () => {
    let rawData = this.state.humanStandardTokenInstance.contract.transfer.getData(this.state.fromAddressHex , this.state.itemPrice)
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
              cellHeight={275}
              padding={10}
              style={styles.gridList}
            >
              {tilesData.map((tile) => (
                <GridTile
                  style={{cursor: 'pointer'}}
                  key={tile.img}
                  title={tile.item}
                  titleStyle={styles.tileTitle}
                  subtitleStyle={styles.tileTitle}
                  subtitle={<span>{tile.price} Tokens</span>}
                  titlePosition="top"
                  titleBackground="linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 70%,rgba(0,0,0,0) 100%)"
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
