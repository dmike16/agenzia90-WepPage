import { css, CSSResultGroup } from "lit";

export function darkTheme(): CSSResultGroup {
  return css`
    html,
    main {
      --mdc-theme-primary: #a5d6a7;
      --mdc-theme-secondary: #80cbc4;
      --mdc-theme-surface: #121212;
      --mdc-theme-background: #121212;
      --mdc-theme-on-primary: #000000;
      --mdc-theme-on-secondary: #000000;
      --mdc-theme-on-surface: #ffffff;
    }
  `;
}
