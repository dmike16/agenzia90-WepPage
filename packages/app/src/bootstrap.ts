// Bootstrap component for studio90srls

import "@studio90srls/swc-container";
import "@studio90srls/swc-header";
import "@studio90srls/swc-cookie-alert";
import "./sections/top/top";
import "./sections/middle/middle";
import "./sections/bottom/bottom";
import "./sections/footer/footer";

import { css, CSSResultGroup, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { infoDecorator } from "./info_decorator";
import { darkTheme } from "./themeing";
import { allCSS } from "./sections/common/all";
import { CookieController } from "./cookie/cookie-controller";

@customElement("swc-root")
@infoDecorator
export class SWCRootComponent extends LitElement {
  static override styles: CSSResultGroup = [
    darkTheme(),
    allCSS(),
    css`
      main {
        height: 100vh;
        width: 100%;
      }
      swc-header {
        --swc-custom-bg: var(--mdc-theme-primary);
        --swc-custom-color: var(--mdc-theme-on-primary);
        --mdc-dialog-heading-ink-color: var(--mdc-theme-on-surface);
        --mdc-dialog-content-ink-color: var(--mdc-theme-on-surface);
      }
    `,
  ];

  override render(): unknown {
    return html`
      <swc-container>
        <swc-header>
          <main>
            <swc-top></swc-top>
            <swc-middle></swc-middle>
            <swc-bottom></swc-bottom>
            <swc-footer></swc-footer>
            <swc-cookie-alert
              ?open=${!this._cookieController.isCookieAlterViewed}
              @viewed=${this._setViewdCookie}
            ></swc-cookie-alert>
          </main>
        </swc-header>
      </swc-container>
    `;
  }

  private _setViewdCookie() {
    this._cookieController.setCookieAlterViewd();
  }

  private _cookieController: CookieController = new CookieController(this);
}
