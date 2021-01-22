import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePage, hideDialog, hideToast } from './redux/actions/ui';
import { ThemeProvider } from '@material-ui/core/styles';
import { Box, CircularProgress } from '@material-ui/core';
import { Navbar } from './components/Navbar';
import { PageContainer } from './components/PageContainer';
import { Dialog } from './components/alerts/Dialog';
import { Toast } from './components/alerts/Toast';
import { getTheme } from './themes';
import './App.css';


function App() {
  // Fetch state from Redux store
  const dispatch = useDispatch();
  const activePage = useSelector(state => state.activePage);
  const dataIsLoaded = useSelector(state => state.dataIsLoaded);
  const dialogState = useSelector(state => state.dialogState);
  const error = useSelector(state => state.error);
  const themeType = useSelector(state => state.settings.appTheme);
  const toastState = useSelector(state => state.toastState);

  return (
    <ThemeProvider theme={getTheme(themeType)}>
      {
        !dataIsLoaded ?
        <Box className="App">
          <CircularProgress />
        </Box> :
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