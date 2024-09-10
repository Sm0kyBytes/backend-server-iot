import { Request, Response, NextFunction } from "express";
import { isValidEmail, isValidPassword } from "./validation-register";

export function ValidationLoginModel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newUserLoginFromClient = req.body;
  if (!newUserLoginFromClient.email || !newUserLoginFromClient.password) {
    return res
      .status(400)
      .json({ message: "Bad Request: Missing or invalid request data." });
  }
  if (!isValidEmail(newUserLoginFromClient.email)) {
    return res.status(400).json({ message: "Bad Request: Invalid email." });
  }
  if (!isValidPassword(newUserLoginFromClient.password)) {
    return res.status(400).json({
      message:
        "Bad Request: Password must contain both uppercase and lowercase letters, numbers, and be between 8 and 15 characters long.",
    });
  }
  next();
}
