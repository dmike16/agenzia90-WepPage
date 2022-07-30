import { assert } from "@open-wc/testing";
import { SWCHeader } from "../header";

describe("swc-header", () => {
  it("is definde", () => {
    const el = document.createElement("swc-header");
    assert.instanceOf(el, SWCHeader);
  });
});
