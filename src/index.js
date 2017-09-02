import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './App.css';

import {yellow800, deepOrangeA700} from 'material-ui/styles/colors';
import { MuiThemeProvider } from 'material-ui/styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: yellow800,
    accent1Color: deepOrangeA700,
  },
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
