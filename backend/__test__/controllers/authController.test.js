const authController = require("../../controllers/authController");
const authService = require("../../services/authService");

jest.mock("../../services/authService", () => ({
  loginUser: jest.fn(),
  generateOTP: jest.fn(),
  comparePasswords: jest.fn(),
  generateTokenResponse: jest.fn(),
  verifyToken: jest.fn(),
  getUserProfile: jest.fn(),
}));

describe("AuthController", () => {
  describe("loginUser", () => {
    it("should call authService.loginUser and return the user if found", async () => {
      const req = { body: { email: "test@example.com" } };
      const res = { json: jest.fn(), status: jest.fn() };
      const user = { _id: "user_id", email: "test@example.com", password: "hashed_password" };

      authService.loginUser.mockResolvedValue(user);
      res.json.mockImplementation(() => res);

      await authController.loginUser(req, res);

      expect(authService.loginUser).toHaveBeenCalledWith("test@example.com");
      expect(res.json).toHaveBeenCalledWith(user);
      expect(res.status).not.toHaveBeenCalled();
    });

    it("should call res.status(400) if user not found", async () => {
      const req = { body: { email: "test@example.com" } };
      const res = { json: jest.fn(), status: jest.fn() };

      authService.loginUser.mockResolvedValue(null);
      res.status.mockImplementation(() => res);

      await authController.loginUser(req, res);

      expect(authService.loginUser).toHaveBeenCalledWith("test@example.com");
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith("User not found");
    });
  });

  describe("verifyOTP", () => {
    it("should call authService.generateOTP and return the generated OTP", async () => {
      const req = { body: { email: "test@example.com" } };
      const res = { json: jest.fn(), status: jest.fn() };
      const otp = "123456";

      authService.generateOTP.mockResolvedValue(otp);
      res.json.mockImplementation(() => res);

      await authController.verifyOTP(req, res);

      expect(authService.generateOTP).toHaveBeenCalledWith("test@example.com");
      expect(res.json).toHaveBeenCalledWith(otp);
      expect(res.status).not.toHaveBeenCalled();
    });
  });

  describe("comparePasswords", () => {
    it("should call authService.comparePasswords and return the result", async () => {
      const req = { body: { password: "password", hashedPassword: "hashed_password" } };
      const res = { json: jest.fn(), status: jest.fn() };
      const result = true;

      authService.comparePasswords.mockResolvedValue(result);
      res.json.mockImplementation(() => res);

      await authController.comparePasswords(req, res);

      expect(authService.comparePasswords).toHaveBeenCalledWith("password", "hashed_password");
      expect(res.json).toHaveBeenCalledWith(result);
      expect(res.status).not.toHaveBeenCalled();
    });
  });

  describe("generateTokenResponse", () => {
    it("should call authService.generateTokenResponse and return the token response", () => {
      const user = { _id: "user_id", email: "test@example.com", isAdmin: false };
      const tokenResponse = { token: "test_token", id: "user_id", email: "test@example.com", isAdmin: false };
      const res = { json: jest.fn(), status: jest.fn() };

      authService.generateTokenResponse.mockReturnValue(tokenResponse);
      res.json.mockImplementation(() => res);

      authController.generateTokenResponse(user, res);

      expect(authService.generateTokenResponse).toHaveBeenCalledWith(user);
      expect(res.json).toHaveBeenCalledWith(tokenResponse);
      expect(res.status).not.toHaveBeenCalled();
    });
  });

  describe("getUserProfile", () => {
    it("should call authService.getUserProfile and return the user profile", async () => {
      const req = { headers: { authorization: "test_token" } };
      const res = { json: jest.fn(), status: jest.fn() };
      const userId = "user_id";
      const user = { _id: "user_id", email: "test@example.com", isAdmin: false };

      authService.verifyToken.mockReturnValue({ id: userId });
      authService.getUserProfile.mockResolvedValue(user);
      res.json.mockImplementation(() => res);

      await authController.getUserProfile(req, res);

      expect(authService.verifyToken).toHaveBeenCalledWith("test_token");
      expect(authService.getUserProfile).toHaveBeenCalledWith(userId);
      expect(res.json).toHaveBeenCalledWith(user);
      expect(res.status).not.toHaveBeenCalled();
    });

    it("should call res.status(401) if authorization token is missing", async () => {
      const req = { headers: { authorization: "" } };
      const res = { json: jest.fn(), status: jest.fn() };

      res.status.mockImplementation(() => res);

      await authController.getUserProfile(req, res);

      expect(authService.verifyToken).not.toHaveBeenCalled();
      expect(authService.getUserProfile).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Authorization token is missing" });
    });

    it("should call res.status(401) if token is invalid", async () => {
      const req = { headers: { authorization: "invalid_token" } };
      const res = { json: jest.fn(), status: jest.fn() };

      authService.verifyToken.mockImplementation(() => {
        throw new Error();
      });
      res.status.mockImplementation(() => res);

      await authController.getUserProfile(req, res);

      expect(authService.verifyToken).toHaveBeenCalledWith("invalid_token");
      expect(authService.getUserProfile).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid token" });
    });
  });
});
