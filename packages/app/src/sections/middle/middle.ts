import { LitElement, html, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { allCSS } from "../common/all";
import { noParallaxCSS } from "../common/parallax-style";
import { sectionsCss } from "../common/section-style";

@customElement("swc-middle")
export class SWCMiddleComponent extends LitElement {
  static override styles?: CSSResultGroup | undefined = [
    sectionsCss(),
    noParallaxCSS(),
    allCSS(),
  ];

  override render(): unknown {
    return html`
      <section class="no-parallax">
        <h1>No WAY</h1>
      </section>
    `;
  }
}

declare global {
  interface HTLMElementTagNameMap {
    "swc-middle": SWCMiddleComponent;
  }
}
