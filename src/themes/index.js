import lightTheme from './light';
import darkTheme from './dark';

function getTheme(type) {
    return type === "light" ? lightTheme : darkTheme ;
}

export { getTheme };