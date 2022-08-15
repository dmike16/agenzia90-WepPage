import { css, CSSResultGroup, html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import "@material/mwc-dialog";
import "@material/mwc-button";
import "@material/mwc-icon";
import "@material/mwc-list/mwc-list";
import "@material/mwc-list/mwc-list-item";
import { Dialog } from "@material/mwc-dialog";

@customElement("swc-cookie-alert")
export class SWCCookieAlert extends LitElement {
  static override styles?: CSSResultGroup | undefined = [
    css`
      .header,
      .footer,
      .content {
        display: flex;
        justify-content: center;
        max-width: 416px;
        width: calc(100% - 48px);
      }

      .footer p {
        font-size: 12px;
        line-height: 16px;
        margin: 12px 0px;
        text-align: left;
      }

      .cookie-icon {
        color: var(--mdc-theme-primary);
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  open: Boolean = false;

  protected override render(): unknown {
    return html`
      <mwc-dialog
        ?open=${!!this.open}
        heading="Benvenuto in studio90srls"
        scrimClickAction=""
        escapeKeyAction=""
      >
        <div class="header">
          <h4>
            studio90srls.it ti informa sui cookie utilizzati in questo sito
          </h4>
        </div>
        <div class="content">
          <mwc-list noninteractive>
            <mwc-list-item graphic="icon" activated>
              <span>Presa visione di questa informativa</span>
              <mwc-icon slot="graphic" class="cookie-icon"
                >help_outline</mwc-icon
              >
            </mwc-list-item>
          </mwc-list>
        </div>
        <div class="footer">
          <p>
            Questo sito non memorizza dati pesonali ne tramite cookie propri ne
            di terza parti.
          </p>
        </div>
        <mwc-button slot="primaryAction" @click=${this._closeDialog}>
          Close
        </mwc-button>
      </mwc-dialog>
    `;
  }

  private _closeDialog(): void {
    this._dialog.close();
    this.dispatchEvent(
      new CustomEvent("viewed", {
        detail: { viewed: true },
        bubbles: true,
        composed: true,
      })
    );
  }

  @query("mwc-dialog")
  private _dialog!: Dialog;
}

declare global {
  interface HTMLElementTagNameMap {
    "swc-cookie-alert": SWCCookieAlert;
  }
}
