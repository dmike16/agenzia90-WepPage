import * as React from 'react';

const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const DEFAULT_APP_CONTEXT = {
    locale: 'it-IT',
    theme: THEME_LIGHT,
    changeLocale(){},
    switchTheme(theme: THEME_LIGHT | THEME_DARK){}
};

export type ApplicationContext = typeof DEFAULT_APP_CONTEXT;

const AppContext =  React.createContext(DEFAULT_APP_CONTEXT);

export {THEME_DARK, THEME_LIGHT, DEFAULT_APP_CONTEXT};
export default AppContext;