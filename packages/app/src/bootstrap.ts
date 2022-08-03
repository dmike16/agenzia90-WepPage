// Bootstrap component for studio90srls

import "@studio90srls/swc-container";
import "@studio90srls/swc-header";
import "./sections/top/top";
import "./sections/middle/middle";
import "./sections/bottom/bottom";
import "./sections/footer/footer";

import { css, CSSResultGroup, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { infoDecorator } from "./info_decorator";
import { darkTheme } from "./themeing";
import { allCSS } from "./sections/common/all";

@customElement("swc-root")
@infoDecorator
export class SWCRootComponent extends LitElement {
  static override styles: CSSResultGroup = [
    darkTheme(),
    allCSS(),
    css`
      main {
        height: 93vh;
        width: 100%;
        perspective: 2px;
        transform-style: preserve-3d;
      }
      swc-header {
        --swc-custom-bg: transparent;
        --swc-custom-color: var(--mdc-theme-on-surface);
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
          </main>
        </swc-header>
      </swc-container>
    `;
  }
}
