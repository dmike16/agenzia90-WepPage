import { css, CSSResultGroup } from "lit";

export function sectionsCss(): CSSResultGroup {
  return css`
    section {
      box-sizing: border-box;
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  `;
}
