// Bootstrap component for studio90srls

import "@studio90srls/swc-container";
import "@studio90srls/swc-header";

import { css, CSSResultGroup, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { infoDecorator } from "./info_decorator";
import { darkTheme } from "./themeing";

@customElement("swc-root")
@infoDecorator
export class SWCRootComponent extends LitElement {
  static override styles: CSSResultGroup = [
    darkTheme(),
    css`
      :host {
        color: blue;
      }
    `,
  ];

  override render(): unknown {
    return html`
      <swc-container>
        <swc-header>
          <main>
            <section>TODO Replace with main compoents</section>
          </main>
        </swc-header>
        <footer>TODO Replace with a component</footer>
      </swc-container>
    `;
  }
}
