// import module
import express, { Router, Request, Response } from "express";
import "dotenv/config";
// import database connection
import connectionPool from "../utils/db";
// import validation
import { protect } from "../middleware/protect";
import { ValidationDeviceModel } from "../middleware/validate-device";

const deviceRouter = Router();
deviceRouter.use(express.json());

//protection api by token require
deviceRouter.use(protect);

export interface deviceModel {
  id?: number;
  user_id: number;
  device_name: string;
  description: string;
  category: string;
  create_at?: Date;
  update_at?: Date;
}

// get all devices
deviceRouter.get("/", async (req: Request, res: Response) => {
  try {
    const result = await connectionPool.query("select * from devices");
    res.send(result.rows);
  } catch (err) {
    res.send("Error" + err);
  }
});

// add new device
deviceRouter.post(
  "/",
  ValidationDeviceModel,
  async (req: Request, res: Response) => {
    const deviceInfo: deviceModel = {
      user_id: req.body.userId,
      device_name: req.body.deviceName,
      description: req.body.description || "No description",
      category: req.body.category || "No category",
    };
    // add date.
    deviceInfo.create_at = new Date();
    deviceInfo.update_at = new Date();

    try {
      const alreadyHasDevice = await connectionPool.query(
        `select * from devices where deevice_name= $1`,
        [deviceInfo.device_name]
      );
      if (alreadyHasDevice.rows[0]) {
        return res.status(404).json({
          message: "This device is already.",
        });
      }
      const response = await connectionPool.query(
        `insert into devices(user_id,deevice_name,description,category,create_at,update_at) values($1,$2,$3,$4,$5,$6 ) returning *`,
        [
          deviceInfo.user_id,
          deviceInfo.device_name,
          deviceInfo.description,
          deviceInfo.category,
          deviceInfo.create_at,
          deviceInfo.update_at,
        ]
      );
      return res
        .status(200)
        .json({ message: "Device has been created successfully." });
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  }
);

//edit device
deviceRouter.put(
  "/:id",
  ValidationDeviceModel,
  async (req: Request, res: Response) => {
    const deviceId = req.params.id;
    console.log(deviceId);

    const deviceInfo: deviceModel = {
      user_id: req.body.userId,
      device_name: req.body.deviceName,
      description: req.body.description || "No description",
      category: req.body.category || "No category",
    };
    // add date.
    deviceInfo.update_at = new Date();
    try {
      const response = await connectionPool.query(
        `update devices set user_id=$1,deevice_name=$2,description=$3,category=$4,update_at=$5 where id=$6`,
        [
          deviceInfo.user_id,
          deviceInfo.device_name,
          deviceInfo.description,
          deviceInfo.category,
          deviceInfo.update_at,
          deviceId,
        ]
      );

      if (response.rowCount === 0) {
        return res.status(404).json({
          message: "Server could not find a requested device to update.",
        });
      } else {
        return res
          .status(200)
          .json({ message: "Device has been updated successfully." });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  }
);
// delete device
deviceRouter.delete("/:id", async (req: Request, res: Response) => {
  const deviceId = req.params.id;

  try {
    const response = await connectionPool.query(
      "delete from devices where id=$1",
      [deviceId]
    );

    if (response.rowCount === 0) {
      return res.status(404).json({
        message: "Server could not find a requested device to delete",
      });
    } else {
      return res.status(200).json({ message: "Deleted device sucessfully" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});

export default deviceRouter;
