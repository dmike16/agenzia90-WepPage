import { css, LitElement, html, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { allCSS } from "../common/all";
import { headlineCSS } from "../common/headline";
import { parallaxCSS } from "../common/parallax-style";
import { sectionsCss } from "../common/section-style";

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
      </section>
    `;
  }
}

declare global {
  interface HTLMElementTagNameMap {
    "swc-top": SWCTopComponent;
  }
}
