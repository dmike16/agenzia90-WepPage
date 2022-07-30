import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("swc-container")
export class SWCContainer extends LitElement {
  override render(): unknown {
    return html`<div><slot></slot></div>`;
  }
}
