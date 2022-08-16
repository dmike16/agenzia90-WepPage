import { css, CSSResult } from "lit";

export const smQuery = "(min-width: 576px)";
export const mdQuery = "(min-width: 768px)";
export const lgQuery = "(min-width: 992px)";
export const xlQuery = "(min-width: 1200px)";
export const xxlQuery = "(min-width: 1400px)";

export function sm(style: CSSResult): CSSResult {
  return css`
    @media (min-width: 576px) {
      ${style}
    }
  `;
}

export function md(style: CSSResult): CSSResult {
  return css`
    @media (min-width: 768px) {
      ${style}
    }
  `;
}

export function lg(style: CSSResult): CSSResult {
  return css`
    @media (min-width: 992px) {
      ${style}
    }
  `;
}

export function xl(style: CSSResult): CSSResult {
  return css`
    @media (min-width: 1200px) {
      ${style}
    }
  `;
}

export function xxl(style: CSSResult): CSSResult {
  return css`
    @media (min-width: 1400px) {
      ${style}
    }
  `;
}
