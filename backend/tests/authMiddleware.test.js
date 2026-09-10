const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

describe("authMiddleware Unit Tests", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    process.env.JWT_SECRET = "testsecretkey";
    req = {
      headers: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  test("should return 401 if no authorization header is provided", () => {
    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "No token provided" });
    expect(next).not.toHaveBeenCalled();
  });

  test("should return 401 if token is invalid or malformed", () => {
    req.headers.authorization = "Bearer invalid.token.value";

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid token" });
    expect(next).not.toHaveBeenCalled();
  });

  test("should decode valid token and attach user to req then call next()", () => {
    const payload = { id: "user_12345" };
    const validToken = jwt.sign(payload, process.env.JWT_SECRET);
    req.headers.authorization = `Bearer ${validToken}`;

    authMiddleware(req, res, next);

    expect(req.user).toBeDefined();
    expect(req.user.id).toBe("user_12345");
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
