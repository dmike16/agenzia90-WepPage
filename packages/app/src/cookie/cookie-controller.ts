import { ReactiveController, ReactiveControllerHost } from "lit";
import Cookies from "js-cookie";

export class CookieController implements ReactiveController {
  constructor(host: ReactiveControllerHost) {
    this._host = host;
    this._host.addController(this as ReactiveController);
  }

  get isCookieAlterViewed(): boolean {
    return this._cookieAlterViewd;
  }

  hostConnected() {
    this._cookieAlterViewd = !!Cookies.get(this._cookieAlterKey);
  }

  hostDisconnected() {
    this._cookieAlterViewd = false;
  }

  setCookieAlterViewd() {
    Cookies.set(this._cookieAlterKey, "true", {
      expires: this._expireCookieDays,
    });
  }

  private _cookieAlterViewd: boolean = false;
  private _expireCookieDays: number = 1;
  private _cookieAlterKey = "cookie-alter-viewed";
  private _host: ReactiveControllerHost;
}
