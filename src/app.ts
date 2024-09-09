import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import connectionPool from "./utils/db";

async function App(): Promise<express.Express> {
  const app = express();
  const client = await connectionPool.connect();

  app.use(cors());
  app.use(bodyParser.json());

  app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello, TypeScript with Express!");
  });

  app.get("/users", async (req: Request, res: Response) => {
    try {
      const result = await client.query("select * from users");
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
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
