import { NextFunction, Request, Response } from "express";
import { user } from "../models/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

const maxAge = 60 * 60 * 2;
export const create_token = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: maxAge,
  });
};

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      msg: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      msg: "Token is missing",
    });
  }

  try {
    const decodedPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.user = {
      id: decodedPayload.id,
      role: decodedPayload.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Invalid token or expired",
    });
  }
};