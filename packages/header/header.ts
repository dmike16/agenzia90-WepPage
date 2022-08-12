import "@material/mwc-top-app-bar";

import { css, LitElement, html, PropertyValueMap, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("swc-header")
export class SWCHeader extends LitElement {
  static override styles: CSSResultGroup = [
    css`
      mwc-top-app-bar {
        --mdc-theme-primary: var(--swc-custom-bg);
        --mdc-theme-on-primary: var(--swc-custom-color);
      }
    `,
  ];

  protected override render(): unknown {
    return html`
      <mwc-top-app-bar>
        <img src="docs/images/logo.svg" alt="logo" slot="navigationIcon" />
        <span slot="title">Studio90srls</span>
        <slot></slot>
      </mwc-top-app-bar>
    `;
  }

  protected override firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.firstUpdated(_changedProperties);
    this.renderRoot.querySelector("mwc-top-app-bar")!.scrollTarget =
      document.body;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "swc-header": SWCHeader;
  }
}
