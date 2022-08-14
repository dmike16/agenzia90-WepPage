import { assert } from "@open-wc/testing";
import { SWCCookieAlert } from "../cookie-alert";

describe("swc-cookie-alert", () => {
  it("is definde", () => {
    const el = document.createElement("swc-cookie-alert");
    assert.instanceOf(el, SWCCookieAlert);
  });
});
