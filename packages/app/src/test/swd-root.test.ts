import { assert } from "@open-wc/testing";
import { SWCRootComponent } from "../bootstrap";

describe("swc-root", () => {
  it("is definde", () => {
    const el = document.createElement("swc-root");
    assert.instanceOf(el, SWCRootComponent);
  });
});
