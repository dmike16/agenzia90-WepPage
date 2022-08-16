import { css, CSSResultGroup } from "lit";

export function stylesCSS(): CSSResultGroup {
  return css`
    :host {
      color: var(--mdc-theme-on-surface);
    }
    .title-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: -3rem;
      text-align: center;
    }

    .title {
      text-shadow: 2px 2px 2px #333;
    }

    .subtitle {
      margin-top: 0.3rem;
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
  `;
}
