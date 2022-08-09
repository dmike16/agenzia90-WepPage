import { css, CSSResultGroup, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("swc-card")
export class SWCCard extends LitElement {
  static override styles?: CSSResultGroup | undefined = [
    css`
      .card-container {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        list-style: none;
      }

      .card-wrapper {
        box-sizing: border-box;
        margin: 16px 0px;
        min-width: 0px;
      }

      .card {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        border-radius: 5px;
        border: 1px solid rgb(224, 224, 224);
        background-color: var(--mdc-theme-surface);
        box-shadow: var(--mdc-theme-surface) 4px 4px 0px -1px,
          rgb(189 189 189) 4px 4px, var(--mdc-theme-surface) 8px 8px 0px -1px,
          rgb(189 189 189) 8px 8px;
      }

      .card-container {
        box-sizing: border-box;
        margin: 4px 0px;
        min-width: 0px;
        padding: 4px 8px;
      }

      .header {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-size: 14px;
        line-height: 1em;
        padding-left: 0.25em;
        padding-right: 0.25em;
        padding-top: 0.8em;
      }

      .subheader {
        box-sizing: border-box;
        margin: 4px 0px 0px;
        min-width: 0px;
      }

      .content {
        box-sizing: border-box;
        margin: 8px 0px;
        min-width: 0px;
        flex-direction: column;
        display: flex;
      }

      .footer-container {
        box-sizing: border-box;
        margin: 4px 0px 0px;
        min-width: 0px;
        background-color: var(--mdc-theme-primary);
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        padding: 4px 8px;
        color: var(--mdc-theme-on-secondary);
      }

      .header ::slotted(*) {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        position: relative;
        display: inline-block;
        border-radius: 0px;
        color: inherit;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        text-decoration: none;
        text-align: inherit;
      }
    `,
  ];

  protected override render(): unknown {
    return html`
      <div class="card-container">
        <div class="card-wrapper">
          <div class="card">
            <div class="card-container">
              <div class="header">
                <slot name="header"></slot>
              </div>
              <div class="subheader">
                <slot name="subheader"></slot>
              </div>
              <div class="content">
                <slot></slot>
              </div>
            </div>
            <div class="footer-container">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "swc-card": SWCCard;
  }
}
