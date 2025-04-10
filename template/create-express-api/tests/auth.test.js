const AuthHelper = require('./helper/auth.helper');

describe("Authentication API", () => {

  test('User should register only once', async () => {
    const auth = new AuthHelper();

    const res1 = await auth.registerUser();
    expect(res1.status).toBe(201);

    try {
      await auth.registerUser();
      fail("Duplicate registration should throw error");
    } catch (error) {
      expect(error.response.status).toBe(409);
    }
  });

  test('User should login successfully', async () => {
    const auth = new AuthHelper();

    await auth.registerUser();
    const res = await auth.loginUser();
    expect(res.status).toBe(200);
    expect(res.data.token).toBeDefined();
  });

  test('User should fetch profile data', async () => {
    const auth = new AuthHelper();

    await auth.registerUser();
    await auth.loginUser();

    const res = await auth.getUserProfile();
    expect(res.status).toBe(200);
    expect(res.data.user.email).toBe(auth.email);
  });

  test('User should refresh token', async () => {
    const auth = new AuthHelper();

    await auth.registerUser();
    await auth.loginUser();

    const res = await auth.refeshToken();
    expect(res.status).toBe(200);
    expect(res.data.accessToken).toBeDefined();
  });
});
