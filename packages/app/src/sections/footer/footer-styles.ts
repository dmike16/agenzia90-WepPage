import { css, CSSResultGroup } from "lit";

export function stylesCSS(): CSSResultGroup {
  return css`
    footer {
      height: 50%;
      clear: both;
      margin-top: 0px;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      flex-direction: column;
    }

    .copyright-wrapper,
    .link-utils-wrapper,
    .friends-wrapper {
      position: relative;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      width: 100%;
      max-width: 118.6rem;
      margin: 2.5rem;
      margin-top: auto;
      color: var(--mdc-theme-on-surface);
    }

    .copyright-content,
    .link-utils-content,
    .friends-content {
      width: 100%;
      margin-left: 3rem;
      margin-top: 3rem;
      display: flex;
      flex-direction: column;
      -webkit-box-pack: center;
      justify-content: center;
      flex: 1 1 auto;
    }

    .copyright-logo {
      position: absolute;
      right: 0px;
      bottom: 50%;
      transform: translateY(50%);
    }

    .link-social {
      margin-right: 2rem;
      position: relative;
      align-self: flex-end;
      display: flex;
      flex: 0 0 auto;
    }

    .copyright-logo img {
      min-width: 56px;
      min-height: 56px;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      border-radius: 6px;
      box-sizing: border-box;
      padding: 0px 12px;
      transition: background-color 0.1s ease-in-out 0s;
    }
  `;
}
