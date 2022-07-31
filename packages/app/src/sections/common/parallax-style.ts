import { css, CSSResultGroup } from "lit";

export function parallaxCSS(): CSSResultGroup {
  return css`
    .parallax::before {
      content: " ";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: block;
      transform: translateZ(-1px) scale(2);
      z-index: -1;
      transform-origin: center center 0;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      min-height: 100vh;
    }

    .bg::before {
      background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url("docs/images/infinite-loop-01.jpg");
    }

    .bg2::before {
      background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url("docs/images/infinite-loop-02.jpg");
    }
    :host {
      transform-style: inherit;
    }
  `;
}

export function noParallaxCSS(): CSSResultGroup {
  return css`
    .no-parallax {
      background-color: var(--mdc-theme-background);
      z-index: 999;
    }
  `;
}
