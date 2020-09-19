import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveWindow } from './redux/actions/ui';
import { ThemeProvider } from '@material-ui/core/styles';
import { Box, CircularProgress } from '@material-ui/core';
import { Navbar } from './components/Navbar';
import { PageContainer } from './components/PageContainer';
import { getTheme } from './themes';
import './App.css';


function App() {
  // Fetch state from Redux store
  const dispatch = useDispatch();
  const dataIsLoaded = useSelector(state => state.dataIsLoaded);
  const themeType = useSelector(state => state.settings.appTheme);
  const activeWindow = useSelector(state => state.activeWindow);
  const error = useSelector(state => state.error);

  return (
    <ThemeProvider theme={getTheme(themeType)}>
      {
        !dataIsLoaded ?
        <Box className="App">
          <CircularProgress />
        </Box> :
        <Box className="App">
          <Navbar
            activeWindow={activeWindow}
            setActiveWindow={newValue => dispatch(setActiveWindow(newValue))}
          />
          <PageContainer
            activeWindow={activeWindow}
            error={error}
          />
        </Box>
      }
    </ThemeProvider>
  );
}

export { App };