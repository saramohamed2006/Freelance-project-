import { Request, Response } from "express";
import { user } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authenticate, create_token } from "../middlewares/auth.middlewares";

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, role } = req.body;
    const userExist = await user.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ message: " invaild email or user already exist " });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({
      fullName,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
export const SignIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userExist = await user.findOne({ email }).select("+password");

    if (!userExist) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    console.log(userExist);

    const token = create_token(
      userExist.id,
      userExist.role
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      status: 200,
      msg: "Sign in successfully",
      data: userExist,
      token: token,
    });

  } catch (error) {
    res.status(500).json({
      message: "Invalid role or server error",
    });
  }
};
export const SignOut = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({
    msg: " logged out successfully",
  });
};
