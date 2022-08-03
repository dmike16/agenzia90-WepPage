import { LitElement, html, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { allCSS } from "../common/all";
import { headlineCSS } from "../common/headline";
import { parallaxCSS } from "../common/parallax-style";
import { sectionsCss } from "../common/section-style";

import "@material/mwc-icon-button";
import { stylesCSS } from "./top-styles";

@customElement("swc-top")
export class SWCTopComponent extends LitElement {
  static override styles?: CSSResultGroup | undefined = [
    sectionsCss(),
    parallaxCSS(),
    headlineCSS(),
    allCSS(),
    stylesCSS(),
  ];

  override render(): unknown {
    return html`
      <section class="parallax bg">
        <div class="title-wrapper">
          <h1 class="title">Studio90srls</h1>
          <h4 class="subtitle">Studio di consulenza automobilistica</h4>
          <h5 class="subtitle">
            Facciamo di tutto per farti risparmiare tempo con la nostra
            professionalità
          </h5>
        </div>
        <div class="action">
          <mwc-icon-button
            icon="arrow_drop_down_circle"
            @click="${this._scrollToNext}"
          ></mwc-icon-button>
        </div>
      </section>
    `;
  }

  private _scrollToNext(): void {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }
}

declare global {
  interface HTLMElementTagNameMap {
    "swc-top": SWCTopComponent;
  }
}
