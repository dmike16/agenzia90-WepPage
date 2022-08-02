import { css, LitElement, html, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { allCSS } from "../common/all";
import { headlineCSS } from "../common/headline";
import { parallaxCSS } from "../common/parallax-style";
import { sectionsCss } from "../common/section-style";

import "@material/mwc-icon-button";

@customElement("swc-top")
export class SWCTopComponent extends LitElement {
  static override styles?: CSSResultGroup | undefined = [
    sectionsCss(),
    parallaxCSS(),
    headlineCSS(),
    allCSS(),
    css`
      :host {
        color: var(--mdc-theme-on-surface);
      }
      .title-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: -3rem;
      }

      .title {
        text-shadow: 2px 2px 2px #333;
      }

      .subtitle {
        text-shadow: 2px 2px 2px #333;
      }

      .action {
        height: 47vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        color: var(--mdc-theme-primary);
      }

      mwc-icon-button {
        --mdc-icon-button-size: 6rem;
        --mdc-icon-size: 4rem;
      }
    `,
  ];

  override render(): unknown {
    return html`
      <section class="parallax bg">
        <div class="title-wrapper">
          <h1 class="title">Studio90srls</h1>
          <h4 class="subtitle">
            Facciamo di tutto per farti risparmiare tempo con la nostra
            professionalità
          </h4>
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
