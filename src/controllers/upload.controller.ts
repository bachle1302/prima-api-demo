import { Request, Response } from "express";
import * as uploadService from "../services/upload.service";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file" });
    }

    const result: any = await uploadService.uploadImage(file);

    return res.json({
      url: result.secure_url
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};