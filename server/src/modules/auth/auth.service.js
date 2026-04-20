import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { User } from "../users/user.model.js";

function signToken(user) {
  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
      email: user.email,
      name: user.name
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
}

export async function registerUser(payload) {
  if (payload.role === "admin") {
    const error = new Error("Admin accounts cannot be created from the public registration endpoint.");
    error.statusCode = 403;
    throw error;
  }

  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    const error = new Error("User already exists with this email.");
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(payload.password, 10);

  const user = await User.create({
    name: payload.name,
    email: payload.email,
    passwordHash,
    role: payload.role,
    phone: payload.phone || "",
    location: payload.location || {},
    isVerified: payload.role === "admin"
  });

  const token = signToken(user);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified
    }
  };
}

export async function loginUser(payload) {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.passwordHash);

  if (!isPasswordValid) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  const token = signToken(user);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified
    }
  };
}

