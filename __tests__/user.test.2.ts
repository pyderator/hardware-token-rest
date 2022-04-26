import { createMocks } from "node-mocks-http";
import addUser from "../pages/api/user/add";

test("create a new user", async () => {
  const { req, res } = createMocks({
    method: "POST",
    body: {
      email: new Date().toISOString(),
      password: "qwetry",
    },
  });

  await addUser(req as any, res as any);
  expect(res._getStatusCode()).toBe(201);
});
