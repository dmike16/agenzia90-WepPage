import { CSSResultGroup, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { allCSS } from "../common/all";
import { headlineCSS } from "../common/headline";
import { noParallaxCSS } from "../common/parallax-style";

import "@material/mwc-button";
import "@material/mwc-fab";
import { linkCSS } from "../common/link";
import { darkTheme } from "../../themeing";
import { stylesCSS } from "./footer-styles";

@customElement("swc-footer")
export class SWCFooterComponent extends LitElement {
  static override styles?: CSSResultGroup = [
    darkTheme(),
    noParallaxCSS(),
    headlineCSS(),
    allCSS(),
    linkCSS(),
    stylesCSS(),
  ];

  private _openFacebookPage() {
    window.open("https://www.facebook.com/90srls", "studio90srsl_fb");
  }
  // private _openInstagramPage() {
  //   window.open('https://www.facebook.com/90srls', "studio90srsl_fb");
  // }
  private _openGooglePage() {
    window.open("https://goo.gl/maps/fnwN3vUSEACmnc6y6", "studio90srsl_go");
  }

  override render(): unknown {
    return html`
      <footer class="no-parallax">
        <div class="link-utils-wrapper">
          <div class="link-utils-content">
            <h4>Link Utili</h4>
          </div>
          <div class="link-social">
            <mwc-fab mini @click="${this._openGooglePage}">
              <svg slot="icon">
                <use xlink:href="docs/images/brands.svg#google"></use>
              </svg>
            </mwc-fab>

            <mwc-fab mini @click="${this._openFacebookPage}">
              <svg slot="icon">
                <use xlink:href="docs/images/brands.svg#facebook"></use>
              </svg>
            </mwc-fab>
          </div>
        </div>
        <div class="friends-wrapper">
          <div class="friends-content">
            <h4>Siti Amici</h4>
          </div>
        </div>
        <div class="copyright-wrapper">
          <div class="copyright-content">
            <small>
              Quest'opera è distribuita con Licenza Creative Commons
              Attribuzione 4.0 Internazionale.
            </small>
            <small>
              <a href="https://github.com/dmike16/agenzia90-WepPage"
                >Source Code</a
              >
              <a href="https://github.com/dmike16">Designed By</a>
              <a href="http://creativecommons.org/about"
                >About Creative Commons</a
              >
            </small>
          </div>
          <div class="copyright-logo">
            <img src="docs/images/logo.svg" alt="logo" />
          </div>
        </div>
      </footer>
    `;
  }
}

declare global {
  interface HTLMElementTagNameMap {
    "swc-footer": SWCFooterComponent;
  }
}
