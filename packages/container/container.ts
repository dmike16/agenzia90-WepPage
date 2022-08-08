import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("swc-container")
export class SWCContainer extends LitElement {
  protected override render(): unknown {
    return html`<div><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "swc-container": SWCContainer;
  }
}
