import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import {Card, CardText, CardTitle} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';

import Dinner from '../images/dinner.jpg'

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
    img: 'https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/13q2/514140/mercedes-benz-g63-amg-6x6-photo-520499-s-986x603.jpg?crop=1xw:1xh;center,center&resize=884:*',
    item: 'ConsenSys North Sweater',
    price: '10,000',
    featured: true,
  },
  {
    img: 'http://www.4freephotos.com/medium/batch/Raining--on-umbrella813.jpg',
    item: 'Sick Day',
    price: '1,000',
  },
  {
    img: 'http://collectwall.com/wp-content/uploads/2016/10/Dog-Run-Autumn-New-Wallpaper.jpg',
    item: 'Doggo',
    price: '5,000',
  },
  {
    img: Dinner,
    item: 'Dinner w/ Joe',
    price: '1,000,000',
    featured: true,
  },
  {
    img: 'https://cdn.daysoftheyear.com/wp-content/images/paperclip-day-e1462623051825.jpg',
    item: 'A Few Paper Clips',
    price: '43',
  },
  {
    img: 'https://www.stevenaitchison.co.uk/wp-content/uploads/paperclip.jpg',
    item: '1 Paper Clip',
    price: '10',
  },
];

class redeem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      item: '',
      itemPrice: 0,
    };
    this.handleItemClick = this.handleItemClick.bind(this)
  }
  handleItemClick = (item, itemPrice) => {
    console.log(item);
    console.log(itemPrice);
    this.setState({
      open: true,
      item: item,
      itemPrice: itemPrice,
    });
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
                  onTouchTap={() => this.handleItemClick(tile.item, tile.price)}
                >
                  <img src={tile.img}/>
                </GridTile>
              ))}
            </GridList>
            <Dialog
              title={this.state.item}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              <p>Description of the Product Here</p>
              <p>Cost: {this.state.itemPrice} tokens</p>

            </Dialog>
          </div>
        </Card>
      </div>
    );
  }
}

export default redeem;
