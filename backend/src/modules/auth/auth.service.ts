import bcrypt from "bcryptjs";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { env } from "../../config/env";
import { HttpError } from "../../middlewares/error.middleware";
import { UserModel } from "../users/users.model";

const toSafeUser = (user: { _id: unknown; name: string; email: string; phone: string; role: string }) => ({
  id: String(user._id),
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role
});

export const registerUser = async (input: { name: string; email: string; password: string; phone: string }) => {
  const existingUser = await UserModel.findOne({ email: input.email.toLowerCase() }).lean();
  if (existingUser) {
    throw new HttpError(409, "EMAIL_ALREADY_EXISTS", "Email is already registered");
  }

  const passwordHash = await bcrypt.hash(input.password, 10);
  const user = await UserModel.create({
    name: input.name,
    email: input.email.toLowerCase(),
    passwordHash,
    phone: input.phone
  });

  return toSafeUser(user);
};

export const loginUser = async (input: { email: string; password: string }) => {
  const user = await UserModel.findOne({ email: input.email.toLowerCase() });
  if (!user) {
    throw new HttpError(401, "INVALID_CREDENTIALS", "Invalid credentials");
  }

  const validPassword = await bcrypt.compare(input.password, user.passwordHash);
  if (!validPassword) {
    throw new HttpError(401, "INVALID_CREDENTIALS", "Invalid credentials");
  }

  const signOptions: SignOptions = { expiresIn: env.jwt.expiresIn as SignOptions["expiresIn"] };
  const token = jwt.sign(
    {
      sub: String(user._id),
      email: user.email,
      role: user.role
    },
    env.jwt.secret as Secret,
    signOptions
  );

  return {
    token,
    user: toSafeUser(user)
  };
};

export const getMe = async (userId: string) => {
  const user = await UserModel.findById(userId).lean();
  if (!user) {
    throw new HttpError(404, "USER_NOT_FOUND", "User not found");
  }

  return toSafeUser(user);
};
