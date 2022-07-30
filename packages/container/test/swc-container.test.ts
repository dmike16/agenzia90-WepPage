import { assert } from "@open-wc/testing";
import { SWCContainer } from "../container";

describe("swc-container", () => {
  it("is definde", () => {
    const el = document.createElement("swc-container");
    assert.instanceOf(el, SWCContainer);
  });
});
