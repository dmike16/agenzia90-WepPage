import { ReactiveController, ReactiveControllerHost } from "lit";
import { smQuery } from "./media-query";

export class MediaQueryController implements ReactiveController {
  constructor(host: ReactiveControllerHost) {
    this._host = host;
    this._host.addController(this as ReactiveController);
    this._smMediaQuery = window.matchMedia(smQuery);
    this._smHandle = (evt: MediaQueryListEvent) => {
      this._isMobile = evt.matches === false;
      this._host.requestUpdate();
    };
  }

  hostConnected(): void {
    this._smHandle({
      matches: this._smMediaQuery.matches,
      media: this._smMediaQuery.media,
    } as MediaQueryListEvent);
    this._smMediaQuery.addEventListener("change", this._smHandle);
  }

  hostDisconnected(): void {
    this, this._smMediaQuery.removeEventListener("change", this._smHandle);
  }

  get isMobile() {
    return this._isMobile;
  }

  private _smHandle: (evt: MediaQueryListEvent) => void;
  private _smMediaQuery: MediaQueryList;
  private _isMobile: boolean = false;
  private _host: ReactiveControllerHost;
}
