import darkTheme from './dark';
import lightTheme from './light';

function getTheme(type) {
  return type === 'light' ? lightTheme : darkTheme;
}

export {getTheme};
