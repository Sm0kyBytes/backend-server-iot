import { Request, Response, NextFunction } from "express";

export function ValidationDeviceModel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newDeviceFromClient = req.body;
  if (!newDeviceFromClient.userId || !newDeviceFromClient.deviceName) {
    return res
      .status(400)
      .json({ message: "Bad Request: Missing or invalid request data." });
  }
  next();
}
