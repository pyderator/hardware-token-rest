import { createMocks } from "node-mocks-http";
import unassignedTokens from "../pages/api/product-key/unassigned";

test("returns unassigned hardware tokens", async () => {
  const { req, res } = createMocks({
    method: "GET",
  });

  await unassignedTokens(req as any, res as any);
  expect(res._getStatusCode()).toBe(200);
});
