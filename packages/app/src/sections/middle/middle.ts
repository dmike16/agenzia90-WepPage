import { css, LitElement, html, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { allCSS } from "../common/all";
import { noParallaxCSS } from "../common/parallax-style";
import { sectionsCss } from "../common/section-style";

import "@studio90srls/swc-card";
import "@material/mwc-tab";
import "@material/mwc-tab-bar";
import { headlineCSS } from "../common/headline";
import { Services } from "./service";

@customElement("swc-middle")
export class SWCMiddleComponent extends LitElement {
  static override styles?: CSSResultGroup | undefined = [
    sectionsCss(),
    noParallaxCSS(),
    allCSS(),
    headlineCSS(),
    css`
      :host {
        color: var(--mdc-theme-on-surface);
      }

      swc-card h4 {
        line-height: 1.5;
        font-weight: 700;
      }

      h2 {
        text-align: center;
      }
    `,
  ];

  protected override render(): unknown {
    return html`
      <section class="no-parallax">
        <h2>I nostri servizi</h2>
        <mwc-tab-bar>
          ${repeat(Services.load(), (v) => v.name, this._mattab)}
        </mwc-tab-bar>
        <swc-card>
          <h4 slot="header">I nostri servizi</h4>
          <p slot="subheader">
            Pospdkskds dpskd spkdsp ds ds ds ds;d s;dk;sk dlsk
            dl;skdksdjsldjsljdilsjdiljs
          </p>
          <div>
            <p>SJDOSJDoSJDOJS</p>
          </div>
          <div slot="footer">
            <p>footer</p>
          </div>
        </swc-card>
      </section>
    `;
  }

  private _mattab(s: Services): unknown {
    return html`
      <mwc-tab label="${s.name}" icon="${s.icon}" stacked isMinWidthIndicator>
      </mwc-tab>
    `;
  }
}

declare global {
  interface HTLMElementTagNameMap {
    "swc-middle": SWCMiddleComponent;
  }
}
