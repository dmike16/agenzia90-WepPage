import { css, CSSResultGroup } from "lit";

export function stylesCSS(): CSSResultGroup {
  return css`
    footer {
      min-height: 50%;
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

    .copyright-wrapper {
      flex-direction: column;
    }

    .copyright-content,
    .link-utils-content,
    .friends-content {
      width: 88%;
      margin-left: 3rem;
      margin-top: 3rem;
      display: flex;
      flex-direction: column;
      -webkit-box-pack: center;
      justify-content: center;
      flex: 1 1 auto;
    }

    .copyright-logo {
      position: relative;
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
    .link-utils-toolbar mwc-button,
    .friends-toolbar mwc-button {
      --mdc-theme-primary: var(--mdc-theme-secondary);
    }

    .sermetra,
    .unasca,
    .cna,
    .motorizzazione,
    .generali,
    .moto-centro-marconi,
    .you-service {
      background-image: url(docs/images/friendLogo.png);
    }

    .sermetra {
      background-position: -8.6px -131px;
    }

    .unasca {
      background-position: -9.9px -169.9px;
    }

    .cna {
      background-position: -9.9px -206px;
    }

    .motorizzazione {
      background-position: -6.6px -241px;
    }

    .generali {
      background-position: -1.3px -30px;
    }

    .moto-centro-marconi {
      background-position: -1.2px -94px;
    }

    .you-service {
      background-position: -1.3px 4px;
    }
  `;
}
