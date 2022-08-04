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

  private _gotosermetra() {
    window.open("https://www.sermetra.it/", "studio90srls_sermetra");
  }
  private _gotounasca() {
    window.open("https://www.unasca.it/", "studio90srls_unasca");
  }
  private _gotocna() {
    window.open("https://www.cna.it/", "studio90srls_cna");
  }
  private _gotomtc() {
    window.open("https://www.motorizzazioneroma.eu/", "studio90srls_mtc");
  }
  private _gotogenerali() {
    window.open("https://www.generali.it/", "studio90srls_generali");
  }
  private _gotomotomarconi() {
    window.open("https://motocentromarconi.it/", "studio90srls_motomarconi");
  }
  private _gotoyouservice() {
    window.open("http://www.youserviceweb.com/", "studio90srls_youservice");
  }

  override render(): unknown {
    return html`
      <footer class="no-parallax">
        <div class="link-utils-wrapper">
          <div class="link-utils-content">
            <h4>Link Utili</h4>
            <div class="link-utils-toolbar">
              <mwc-button
                raised
                dense
                label="SERMETRA"
                @click=${this._gotosermetra}
              >
                <span slot="icon" class="sermetra"></span>
              </mwc-button>
              <mwc-button
                raised
                dense
                label="UNASCA"
                @click=${this._gotounasca}
              >
                <span slot="icon" class="unasca"></span>
              </mwc-button>
              <mwc-button raised dense label="CNA" @click="${this._gotocna}">
                <span slot="icon" class="cna"></span>
              </mwc-button>
              <mwc-button
                raised
                dense
                label="MOTORIZZAZIONE"
                @click=${this._gotomtc}
              >
                <span slot="icon" class="motorizzazione"></span>
              </mwc-button>
            </div>
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
            <div class="friends-toolbar">
              <mwc-button
                raised
                dense
                label="GENERALI"
                @click="${this._gotogenerali}"
              >
                <span slot="icon" class="generali"></span>
              </mwc-button>
              <mwc-button
                raised
                dense
                label="MOTO CENTRO MARCONI"
                @click="${this._gotomotomarconi}"
              >
                <span slot="icon" class="moto-centro-marconi"></span>
              </mwc-button>
              <mwc-button
                raised
                dense
                label="YOU SERVICE"
                @click="${this._gotoyouservice}"
              >
                <span slot="icon" class="you-service"></span>
              </mwc-button>
            </div>
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
