import { createMocks } from "node-mocks-http";
import addKey from "../pages/api/product-key/add";

test("create a new hardware token", async () => {
  const { req, res } = createMocks({
    method: "POST",
    body: {
      productKey: new Date().toISOString(),
    },
  });

  await addKey(req as any, res as any);
  expect(res._getStatusCode()).toBe(201);
  expect(JSON.parse(res._getData())).toEqual(
    expect.objectContaining({
      message: "Hardware Token Created Successfully",
    })
  );
});
