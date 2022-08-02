import { css } from "lit";

export function allCSS() {
  return css`
    *,
    ::after,
    ::before {
      box-sizing: border-box;
    }
  `;
}
