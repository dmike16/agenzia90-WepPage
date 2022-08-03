import { css } from "lit";

export function headlineCSS() {
  return css`
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-bottom: 0.5rem;
      font-family: inherit;
      font-weight: 500;
      line-height: 1.2;
      color: inherit;
    }

    h1 {
      font-size: var(--mdc-typography-headline1-font-size);
      font-weight: var(--mdc-typography-headline1-font-weight);
    }

    h4 {
      font-size: var(--mdc-typography-headline4-font-size);
      font-weight: var(--mdc-typography-headline4-font-weight);
    }

    h5 {
      font-size: var(--mdc-typography-headline5-font-size);
      font-weight: var(--mdc-typography-headline5-font-weight);
    }
  `;
}
