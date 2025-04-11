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



describe("Users Crud API Test", () => {
  test('Admin should fetch all users', async () => {
    const auth = new AuthHelper();

    const res = await auth.getAllUsers();
    expect(res.status).toBe(200);
    expect(res.data.data).toBeDefined();
  });

  test('User should fetch their own profile', async () => {
    const auth = new AuthHelper();
    await auth.registerUser();
    await auth.loginUser();

    const res = await auth.getUserProfile();
    expect(res.status).toBe(200);
    expect(res.data.user.email).toBe(auth.email);
  });

  test('Create user by admin', async () => {
    const auth = new AuthHelper();

    const res = await auth.createUserByAdmin();
    expect(res.status).toBe(201);
    expect(res.data.user.roles).toContain('test');
  });

  test('User should update their own profile', async () => {
    const auth = new AuthHelper();
    await auth.registerUser();
    await auth.loginUser();

    const res = await auth.updateUser();
    expect(res.status).toBe(200);
    expect(res.data.message).toBe('User updated successfully');
  });

  test('User should delete their own profile', async () => {
    const auth = new AuthHelper();
    await auth.registerUser();
    await auth.loginUser();

    const res = await auth.deleteUser();
    expect(res.status).toBe(200);
    expect(res.data.message).toBe('User deleted successfully');
  });

  test('Admin should delete users by name', async () => {
    const auth = new AuthHelper();

    const res = await auth.deleteUserByName();
    expect(res.status).toBe(200);
    expect(res.data.message).toBe('user(s) deleted successfully');
  });
})

