import { css, LitElement, html, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { choose } from "lit/directives/choose.js";
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

      swc-card {
        min-width: 33vw;
      }

      swc-card h4 {
        line-height: 1.5;
        font-weight: 700;
      }

      h2 {
        text-align: center;
      }

      swc-card h4::before {
        display: block;
        background-color: var(--mdc-theme-primary);
        transform: scaleY(0.125);
        transform-origin: center bottom;
        content: "";
        display: block;
        position: absolute;
        bottom: -0.065rem;
        inset: 0px;
        pointer-events: none;
        transform: scaleY(0.125);
        transition: transform 120ms cubic-bezier(0.23, 1, 0.32, 1);
      }

      mwc-tab {
        --mdc-tab-color-default: var(--mdc-theme-on-surface);
        --mdc-tab-text-label-color-default: var(--mdc-theme-on-surface);
      }

      .footer {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        justify-content: space-between;
        display: flex;
      }

      .footer-hint {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        -webkit-box-align: center;
        align-items: center;
        gap: 8px;
        display: flex;
      }

      .footer-logo {
        width: 44px;
        height: 44px;
        margin: 0;
        padding: 0;
      }
    `,
  ];

  protected override render(): unknown {
    return html`
      <section class="no-parallax">
        <h2>I nostri servizi</h2>
        <mwc-tab-bar
          activeIndex="0"
          @MDCTabBar:activated=${this._onTabSelected}
        >
          ${repeat(this._services, (v) => v.name, this._mattab)}
        </mwc-tab-bar>
        ${choose(this._indexTabSelected, [
          [0, () => this._buildSericeCard(this._services[0])],
          [1, () => this._buildSericeCard(this._services[1])],
          [2, () => this._buildSericeCard(this._services[2])],
          [3, () => this._buildSericeCard(this._services[3])],
          [4, () => this._buildSericeCard(this._services[4])],
          [5, () => this._buildSericeCard(this._services[5])],
          [6, () => this._buildSericeCard(this._services[6])],
          [7, () => this._buildSericeCard(this._services[7])],
        ])}
      </section>
    `;
  }

  private _mattab(s: Services): unknown {
    return html`
      <mwc-tab label="${s.name}" icon="${s.icon}" stacked isMinWidthIndicator>
      </mwc-tab>
    `;
  }

  private _onTabSelected(evt: CustomEvent) {
    this._indexTabSelected = evt.detail.index;
  }

  private _buildSericeCard(s: Services): unknown {
    return html`
      <swc-card>
        <h4 slot="header">${s.name}</h4>
        <p slot="subheader">${s.description}</p>
        <div class="footer" slot="footer">
          <div class="footer-hint">
            <img class="footer-logo" src="docs/images/logo.svg" alt="logo" />
          </div>
          <span>
            <small>${s.hint}</small>
          </span>
        </div>
      </swc-card>
    `;
  }

  private _services: Services[] = Services.load();
  @state()
  private _indexTabSelected: number = 0;
}

declare global {
  interface HTLMElementTagNameMap {
    "swc-middle": SWCMiddleComponent;
  }
}
