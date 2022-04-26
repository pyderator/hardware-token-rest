import { createMocks } from "node-mocks-http";
import loginUser from "../pages/api/user/login";

test("does allow a user to login with fake username/password", async () => {
  const { req, res } = createMocks({
    method: "POST",
    body: {
      email: "aaks@gmail.com",
      password: "qwetry1",
      code: "1233",
    },
  });

  await loginUser(req as any, res as any);
  expect(res._getStatusCode()).toBe(401);
});
