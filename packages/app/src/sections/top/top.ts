import { css, LitElement, html, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { parallaxCSS } from "../common/parallax-style";
import { sectionsCss } from "../common/section-style";

@customElement("swc-top")
export class SWCTopComponent extends LitElement {
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
      <section class="parallax bg">
        <h1>
          The sound that occurs when you snap your fingers is made by your
          middle finger hitting your palm!
        </h1>
      </section>
    `;
  }
}

declare global {
  interface HTLMElementTagNameMap {
    "swc-top": SWCTopComponent;
  }
}
