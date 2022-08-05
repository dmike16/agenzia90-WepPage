import { css, LitElement, html, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { allCSS } from "../common/all";
import { headlineCSS } from "../common/headline";
import { parallaxCSS } from "../common/parallax-style";
import { sectionsCss } from "../common/section-style";
import "@material/mwc-list/mwc-list";
import "@material/mwc-list/mwc-list-item";
import "@material/mwc-icon/mwc-icon";

@customElement("swc-bottom")
export class SWCBottomComponent extends LitElement {
  static override styles?: CSSResultGroup | undefined = [
    sectionsCss(),
    parallaxCSS(),
    allCSS(),
    headlineCSS(),
    css`
      :host {
        color: var(--mdc-theme-on-surface);
      }

      .contact-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        margin: 0 auto;
      }

      .contact-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
      }

      .contact-text p {
        margin-top: 0;
      }

      mwc-list-item {
        --mdc-theme-text-primary-on-background: var(--mdc-theme-on-surface);
        --mdc-theme-text-icon-on-background: var(--mdc-theme-on-surface);
        --mdc-theme-text-secondary-on-background: var(--mdc-theme-on-surface);
      }
    `,
  ];

  override render(): unknown {
    return html`
      <section class="parallax bg2">
        <div class="contact-wrapper">
          <h2>Contatti</h2>
          <div class="contact-info">
            <div class="contact-text">
              <p>
                Vieni a trovarci nella nostra sede di Roma, in Via Silvestro Gherardi 24.
                <strong>Parcheggio gratuito per i nostri clienti</strong>. <br/>
                </br>
                Consulta i nostri orari o contattaci sui nostri canali.
              </p>
            </div>
           <mwc-list>
            <mwc-list-item graphic="icon" @click=${this._openmap}>
              <span>Via Silvestro Gherardi, 24</span>
              <mwc-icon slot="graphic">pin_drop</mwc-icon>
            </mwc-list-item>
            <li divider inset role="separator"></li>
            <mwc-list-item twoline graphic="icon" noninteractive>
              <span>Lunedi - Venerdi</span>
              <span slot="secondary">09:00 - 13:00 &#x26AC; 15:00 - 19:00</span>
              <mwc-icon slot="graphic">schedule</mwc-icon>
            </mwc-list-item>
            <li divider inset role="separator"></li>
            <mwc-list-item twoline graphic="icon" noninteractive>
              <span>Sabato</span>
              <span slot="secondary">09:00 - 13:00</span>
              <mwc-icon slot="graphic">schedule</mwc-icon>
            </mwc-list-item>
            <mwc-list-item graphic="icon" @click=${this._opentel}>
              <span>06 01 90 5227</span>
              <mwc-icon slot="graphic">call</mwc-icon>
            </mwc-list-item>
            <li divider inset role="separator"></li>
            <mwc-list-item graphic="icon" @click=${this._opencell}>
              <span>339 24 57 552</span>
              <mwc-icon slot="graphic">smartphone</mwc-icon>
            </mwc-list-item>
            <li divider inset role="separator"></li>
            <mwc-list-item graphic="icon" @click=${this._openmail}>
              <span>90srls@gmail.com</span>
              <mwc-icon slot="graphic">mail</mwc-icon>
            </mwc-list-item>
           </mwc-list>
          </div>
        </div>
      </section>
    `;
  }

  private _opentel(): void {
    window.open("tel:0601905227", "_self");
  }

  private _opencell(): void {
    window.open("tel:3392457552", "_self");
  }

  private _openmail(): void {
    window.open("mailto:90srls@gmail.com", "_self");
  }

  private _openmap(): void {
    window.open(
      "https://www.google.com/maps/dir//Pratiche+Auto+90srls+Consulenza+Automobilistica",
      "studio90srls_map"
    );
  }
}

declare global {
  interface HTLMElementTagNameMap {
    "swc-bottom": SWCBottomComponent;
  }
}
