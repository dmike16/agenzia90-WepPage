// @flow

import * as ReactDOM from 'react-dom';
import * as React from 'react';

import { hot } from 'react-hot-loader/root';
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import Header from './header/header';
import Footer from './footer/footer';
import AppContext, { ApplicationContext, DEFAULT_APP_CONTEXT, THEME_LIGHT, THEME_DARK } from './app.context';
/**
 * Studio90srls main class
 */
class Studio90srls extends React.Component<{}, ApplicationContext> {
  static bootstrap() {
    console.log("%c90 s r l s\n%cPratiche Auto\nTel 06 01905227",
      "font-size:1.5em;color:#1945D5;", "color:#14BD4C;font-size:1em;");
    if (!process.env.PROD) {
      console.log("%cDeveloping mode enabled\n",
        "color:#a91839;font-size:1em;");
    } else {
      // Install service worker
      intallSW('/studio90srls-sw.js');
    }
    library.add(fab);
    const rootContainer = (document.getElementById('main-container'): any);
    ReactDOM.render(<Studio90srls />, rootContainer);
  }

  switchTheme = (theme: THEME_LIGHT | THEME_DARK) => {
    console.info('Changing theme', theme);
    this.setState({
      theme
    });
  }

  changeLocale = (locale: string) => {
    this.setState({ locale });
  }

  constructor(props) {
    super(props);
    this.state = {
      ...DEFAULT_APP_CONTEXT,
      switchTheme: this.switchTheme,
      changeLocale: this.changeLocale
    };
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <Header></Header>
        <TopAppBarFixedAdjust>
          <p>Main content working in progress....</p>
        </TopAppBarFixedAdjust>
        <Footer></Footer>
      </AppContext.Provider>
    );
  }
}

function intallSW(name: string) {
  const serviceWorker = navigator.serviceWorker;
  if (serviceWorker) {
    window.addEventListener('load', () => {
      serviceWorker.register(name, { scope: './' }).then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
}

export default hot(Studio90srls);
