import React from 'react';

import {ThemeProvider} from '@material-ui/core/styles';
import {useSelector} from 'react-redux';

import {loadingLight} from './assets/images';
import {Toast} from './components/alerts/Toast';
import {Introduction} from './components/introduction/Introduction';
import {Navbar} from './components/Navbar';
import {PageContainer} from './components/PageContainer';
import {getTheme} from './themes';
import './App.css';


function App() {
  const appTheme = useSelector((state) => state.settings.appTheme);
  const dataIsLoaded = useSelector((state) => state.dataIsLoaded);
  const firstTimeUser = useSelector((state) => state.settings.firstTimeUser);

  return (
    <ThemeProvider theme={getTheme(appTheme)}>
      {
        !dataIsLoaded &&
        <div className="App">
          <img src={loadingLight} alt="loading" width="100px" />
        </div>
      }
      {
        dataIsLoaded && firstTimeUser &&
        <Introduction />
      }
      {
        dataIsLoaded && !firstTimeUser &&
        <div className="App">
          <Navbar />
          <PageContainer />
          <Toast />
        </div>
      }
    </ThemeProvider>
  );
}

export {App};
