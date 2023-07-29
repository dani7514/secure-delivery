const authService = require("../../services/authService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/User");

jest.mock("../../models/User", () => ({
  findOne: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
  sign: jest.fn(),
}));

describe("AuthService", () => {
  describe("loginUser", () => {
    it("should return the user if found", async () => {
      const user = {
        _id: "user_id",
        email: "test@example.com",
        password: "hashed_password",
      };

      userModel.findOne.mockResolvedValue(user);

      const result = await authService.loginUser("test@example.com");

      expect(userModel.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(result).toEqual(user);
    });

    it("should return null if user not found", async () => {
      userModel.findOne.mockResolvedValue(null);

      const result = await authService.loginUser("test@example.com");

      expect(userModel.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(result).toBeNull();
    });
  });

  describe("generateOTP", () => {
    it("should generate and save OTP for the user", async () => {
      const user = {
        _id: "user_id",
        email: "test@example.com",
        otp: null,
        save: jest.fn(),
      };

      userModel.findOne.mockResolvedValue(user);

      const otp = await authService.generateOTP("test@example.com");

      expect(userModel.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(user.otp).not.toBeNull();
      expect(user.save).toHaveBeenCalled();
      expect(otp).toEqual(user.otp);
    });
  });

  describe("comparePasswords", () => {
    it("should return true if passwords match", async () => {
      const password = "password";
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await authService.comparePasswords(password, hashedPassword);

      expect(result).toBe(true);
    });

    it("should return false if passwords do not match", async () => {
      const password = "password";
      const wrongPassword = "wrong_password";
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await authService.comparePasswords(wrongPassword, hashedPassword);

      expect(result).toBe(false);
    });
  });

  describe("generateTokenResponse", () => {
    it("should generate a token response with user data", () => {
      const user = {
        _id: "user_id",
        email: "test@example.com",
        isAdmin: false,
      };

      const result = authService.generateTokenResponse(user);

      expect(result).toHaveProperty("token");
      expect(result.token).not.toBeNull();
    });
  });

  describe("verifyToken", () => {
    it("should verify and return the decoded token", () => {
      const token = "test_token";
      const secretKey = "test_secret_key";
      const decoded = { id: "user_id", email: "test@example.com", isAdmin: false };

      jwt.verify.mockReturnValue(decoded);

      const result = authService.verifyToken(token, secretKey);

      expect(jwt.verify).toHaveBeenCalledWith(token, secretKey);
      expect(result).toEqual(decoded);
    });
  });

  describe("getUserProfile", () => {
    it("should return the user profile", async () => {
      const userId = "user_id";
      const user = {
        _id: userId,
        email: "test@example.com",
        isAdmin: false,
      };

      userModel.findOne.mockResolvedValue(user);

      const result = await authService.getUserProfile(userId);

      expect(userModel.findOne).toHaveBeenCalledWith({ _id: userId });
      expect(result).toEqual(user);
    });
  });
});
