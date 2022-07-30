import { ReactiveElement } from "lit";
import { $info } from "./loglevel";

export function infoDecorator(ctor: typeof ReactiveElement) {
  ctor.addInitializer(() => {
    $info(
      "%c90 s r l s\n%cPratiche Auto\nTel 06 01905227",
      "font-size:1.5em;color:#1945D5;",
      "color:#14BD4C;font-size:1em;"
    );
  });
}
