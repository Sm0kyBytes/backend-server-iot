// import module
import express, { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import "dotenv/config";
// import jwt from "jsonwebtoken";
// import database connection
import connectionPool from "../utils/db";
// import validation
import { ValidationUserModel } from "../middleware/validation-user";

const authRouter = Router();
authRouter.use(express.json());

export interface UserModel {
  id?: number;
  username: string;
  email: string;
  password: string;
  create_at?: Date;
}

async function hashPassword(plainTextPassword: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
  return hashedPassword;
}

// get all users
authRouter.get("/", async (req: Request, res: Response) => {
  try {
    const result = await connectionPool.query("select * from users");
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.send("Error" + err);
  }
});

// register new user
authRouter.post(
  "/register",
  ValidationUserModel,
  async (req: Request, res: Response) => {
    const userInfo: UserModel = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    // hash password
    userInfo.password = await hashPassword(userInfo.password);
    userInfo.create_at = new Date();

    try {
      const responce = await connectionPool.query(
        `insert into users(username,email,password,create_at) values($1,$2,$3,$4 ) returning *`,
        [
          userInfo.username,
          userInfo.email,
          userInfo.password,
          userInfo.create_at,
        ]
      );

      return res
        .status(200)
        .json({ message: "User has been created successfully" });
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default authRouter;
