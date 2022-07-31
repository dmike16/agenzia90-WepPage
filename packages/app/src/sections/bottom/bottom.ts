import { css, LitElement, html, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { parallaxCSS } from "../common/parallax-style";
import { sectionsCss } from "../common/section-style";

@customElement("swc-bottom")
export class SWCBottomComponent extends LitElement {
  static override styles?: CSSResultGroup | undefined = [
    sectionsCss(),
    parallaxCSS(),
    css`
      :host {
        color: var(--mdc-theme-on-surface);
      }
    `,
  ];

  override render(): unknown {
    return html`
      <section class="parallax bg2">
        <h1>No WAY</h1>
      </section>
    `;
  }
}

declare global {
  interface HTLMElementTagNameMap {
    "swc-bottom": SWCBottomComponent;
  }
}
