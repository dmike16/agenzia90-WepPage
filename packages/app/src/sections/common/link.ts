import { css } from "lit";

export function linkCSS() {
  return css`
    a {
      color: var(--mdc-theme-primary);
      text-decoration: none;
      background: transparent;
      margin-right: 12px;
      transition: color 0.1s linear;
      cursor: pointer;
    }

    ::selection {
      background-color: var(--mdc-theme-primary);
      color: var(--mdc-theme-on-surface);
    }
  `;
}
