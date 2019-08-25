// @flow

import * as ReactDOM from 'react-dom';
import * as React from 'react';

import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import { Header } from './header/header';
/**
 * Studio90srls main class
 */
export class Studio90srls extends React.Component<{}> {
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
    const rootContainer = (document.getElementById('main-container'): any);
    ReactDOM.render(<Studio90srls />, rootContainer);
  }

  render() {
    return (<>
      <Header></Header>
      <TopAppBarFixedAdjust>
        <p>Main content working in progress....</p>
      </TopAppBarFixedAdjust>
      <footer>
        <h4>Bye Studio90srls</h4>
      </footer>
    </>);
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
