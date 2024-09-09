import { Request, Response, NextFunction } from "express";

function isValidEmail(email: string): boolean {
  const filter = /^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/;
  return filter.test(email);
}

function isValidPassword(password: string): boolean {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,15}$/;
  return regex.test(password);
}

export function ValidationUserModel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newUserFromClient = req.body;
  if (
    !newUserFromClient.username ||
    !newUserFromClient.email ||
    !newUserFromClient.password
  ) {
    return res
      .status(400)
      .json({ message: "Bad Request: Missing or invalid request data." });
  }
  if (!isValidEmail(newUserFromClient.email)) {
    return res.status(400).json({ message: "Bad Request: Invalid email." });
  }
  if (!isValidPassword(newUserFromClient.password)) {
    return res.status(400).json({
      message:
        "Bad Request: Password must contain both uppercase and lowercase letters, numbers, and be between 8 and 15 characters long.",
    });
  }
  next();
}
