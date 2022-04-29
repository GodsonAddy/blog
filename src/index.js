import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store'
import { unstable_createMuiStrictModeTheme as createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { PersistGate } from 'redux-persist/integration/react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
    fontFamily: [
      'Poppins',
    ].join(','),
    palette: {
      primary: '#FFFFFF',
      secondary: '4A4D4E'
    }
  },
  palette: {
    primary: {
      main: "#00b8d4"
    },
    secondary: {
      main: '#fff'
    },
    tertiary: {
      main: '#000'
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <Router>
        <ThemeProvider theme={theme}>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
