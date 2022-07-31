import { css, CSSResultGroup } from "lit";

export function sectionsCss(): CSSResultGroup {
  return css`
    section {
      box-sizing: border-box;
      transform-style: inherit;
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    section,
    section::before {
      background: 50% 50% / cover;
    }
  `;
}
