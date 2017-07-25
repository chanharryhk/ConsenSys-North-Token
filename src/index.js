import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider } from 'material-ui/styles';
import App from './App'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import './App.css';

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
