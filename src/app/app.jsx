// @flow

import * as ReactDOM from 'react-dom';
import * as React from 'react';
/**
 * Studio90srls main class
 */
export class Studio90srls extends React.Component<{}> {
  static bootstrap() {
    console.log("%c90 s r l s\n%cPratiche Auto\nTel 06 01905227",
      "font-size:1.5em;color:#1945D5;", "color:#14BD4C;font-size:1em;");
    if (!process.env.PROD) {
      console.log("%cDeveloping mode enabled\n",
        "color:#a91839;font-size:1em;")
    }
    const rootContainer = (document.getElementById('main-container'): any);
    ReactDOM.render(<Studio90srls />, rootContainer);
    // Install service worker
    // BroswerPlatform.intallSW('/studio90srls-sw.js')
  }

  render() {
    return <>
      <header>
        <h1>Hello Studio90srls</h1>
      </header>
      <main>
        <p>Main content working in progress....</p>
      </main>
      <footer>
        <h4>Bye Studio90srls</h4>
      </footer>
    </>;
  }
}

/*namespace BroswerPlatform {
  export function intallSW(name: string) {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register(name,{scope: './'}).then(registration => {
          console.log('SW registered: ', registration);
        }).catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
      });
    }
  }
}*/
