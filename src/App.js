import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePage, hideToast } from './redux/actions/ui';
import { ThemeProvider } from '@material-ui/core/styles';
import { Navbar } from './components/Navbar';
import { PageContainer } from './components/PageContainer';
import { Toast } from './components/alerts/Toast';
import { Introduction } from './components/introduction/Introduction';
import { getTheme } from './themes';
import { loadingLight } from './assets/images';
import './App.css';


function App() {
  // Fetch state from Redux store
  const dispatch = useDispatch();
  const activePage = useSelector(state => state.activePage);
  const appTheme = useSelector(state => state.settings.appTheme);
  const dataIsLoaded = useSelector(state => state.dataIsLoaded);
  const error = useSelector(state => state.error);
  const firstTimeUser = useSelector(state => state.settings.firstTimeUser);
  const isFetching = useSelector(state => state.isFetching);
  const toastState = useSelector(state => state.toastState);

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
            setActivePage={id => dispatch(setActivePage(id))}
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

export { App };