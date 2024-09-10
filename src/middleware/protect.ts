import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token has invalid format" });
  }
  const tokenWithoutBearer = token.split(" ")[1];
  const secretKey: string | undefined = process.env.SECRET_KEY;
  if (secretKey === undefined) {
    throw new Error("SECRET_KEY is not defined");
  }
  jwt.verify(tokenWithoutBearer, secretKey, (err, payload) => {
    if (err) {
      return res.status(401).json({ message: "Token is invalid" });
    }
    req.body.user = payload;
    next();
  });
};
