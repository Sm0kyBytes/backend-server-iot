import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

// Router
import authRouter from "./apps/auth";
import deviceRouter from "./apps/device";

async function App(): Promise<express.Express> {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use("/users", authRouter);
  app.use("/devices", deviceRouter);

  app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello, TypeScript with Express!");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });
  return app;
}

App()
  .then((app) => {
    const port = process.env.APP_PORT || 4000;
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Failed to start server.", err);
  });
