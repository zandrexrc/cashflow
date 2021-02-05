import React from 'react';

import {ThemeProvider} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';

import {loadingLight} from './assets/images';
import {Toast} from './components/alerts/Toast';
import {Introduction} from './components/introduction/Introduction';
import {Navbar} from './components/Navbar';
import {PageContainer} from './components/PageContainer';
import {setActivePage, hideToast} from './redux/actions/ui';
import {getTheme} from './themes';
import './App.css';


function App() {
  const dispatch = useDispatch();
  const activePage = useSelector((state) => state.activePage);
  const appTheme = useSelector((state) => state.settings.appTheme);
  const dataIsLoaded = useSelector((state) => state.dataIsLoaded);
  const error = useSelector((state) => state.error);
  const firstTimeUser = useSelector((state) => state.settings.firstTimeUser);
  const isFetching = useSelector((state) => state.isFetching);
  const toastState = useSelector((state) => state.toastState);

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
          <Navbar
            activePage={activePage}
            setActivePage={(id) => dispatch(setActivePage(id))}
          />
          <PageContainer
            activePage={activePage}
            error={error}
            isFetching={isFetching}
          />
          <Toast
            close={() => dispatch(hideToast())}
            isOpen={toastState.isOpen}
            message={toastState.message}
            severity={toastState.severity}
          />
        </div>
      }
    </ThemeProvider>
  );
}

export {App};
