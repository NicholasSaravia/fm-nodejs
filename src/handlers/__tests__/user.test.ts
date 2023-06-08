import * as user from "../user";

describe("user handler", () => {
  it("should create a new user", async () => {
    const req = {
      body: {
        userName: "john",
        password: "smith",
      },
    };
    const res = {
      json({ token }) {
        expect(token).toBeTruthy();
      },
    };
    const newUser = await user.createNewUser(req, res, () =>
      console.log("next")
    );
  });
});
