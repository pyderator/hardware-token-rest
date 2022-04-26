import { createMocks } from "node-mocks-http";
import loginUser from "../pages/api/user/login";

test("does allow a user to login with fake totp code", async () => {
  const { req, res } = createMocks({
    method: "POST",
    body: {
      email: "aaks@gmail.com",
      password: "qwetry",
      code: "1233",
    },
  });

  await loginUser(req as any, res as any);
  expect(res._getStatusCode()).toBe(401);
});
