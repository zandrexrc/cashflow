import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePage, hideDialog, hideToast } from './redux/actions/ui';
import { ThemeProvider } from '@material-ui/core/styles';
import { Box, CircularProgress } from '@material-ui/core';
import { Navbar } from './components/Navbar';
import { PageContainer } from './components/PageContainer';
import { Dialog } from './components/alerts/Dialog';
import { Toast } from './components/alerts/Toast';
import { Introduction } from './components/introduction/Introduction';
import { getTheme } from './themes';
import './App.css';


function App() {
  // Fetch state from Redux store
  const dispatch = useDispatch();
  const activePage = useSelector(state => state.activePage);
  const appTheme = useSelector(state => state.settings.appTheme);
  const dataIsLoaded = useSelector(state => state.dataIsLoaded);
  const dialogState = useSelector(state => state.dialogState);
  const error = useSelector(state => state.error);
  const firstTimeUser = useSelector(state => state.settings.firstTimeUser);
  const toastState = useSelector(state => state.toastState);

  return (
    <ThemeProvider theme={getTheme(appTheme)}>
      {
        !dataIsLoaded &&
        <Box className="App">
          <CircularProgress />
        </Box>
      }
      {
        dataIsLoaded && firstTimeUser &&
        <Introduction />
      }
      {
        dataIsLoaded && !firstTimeUser &&
        <Box className="App">
          <Navbar
            activePage={activePage}
            setActivePage={id => dispatch(setActivePage(id))}
          />
          <PageContainer
            activePage={activePage}
            error={error}
          />
          <Dialog
            cancel={() => dispatch(hideDialog())}
            confirm={dialogState.confirm}
            isOpen={dialogState.isOpen}
            title={dialogState.message}
          />
          <Toast
            close={() => dispatch(hideToast())}
            isOpen={toastState.isOpen}
            message={toastState.message}
            severity={toastState.severity}
          />
        </Box>
      }
    </ThemeProvider>
  );
}

export { App };