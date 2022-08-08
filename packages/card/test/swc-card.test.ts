import { assert } from "@open-wc/testing";
import { SWCCard } from "../card";

describe("swc-card", () => {
  it("is definde", () => {
    const el = document.createElement("swc-card");
    assert.instanceOf(el, SWCCard);
  });
});
