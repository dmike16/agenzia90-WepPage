import "@material/mwc-top-app-bar";

import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("swc-header")
export class SWCHeader extends LitElement {
  override render(): unknown {
    return html`
      <mwc-top-app-bar>
        <img src="docs/images/logo.svg" alt="logo" slot="navigationIcon" />
        <span slot="title">Studio90srls</span>
        <slot></slot>
      </mwc-top-app-bar>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "swc-header": SWCHeader;
  }
}
