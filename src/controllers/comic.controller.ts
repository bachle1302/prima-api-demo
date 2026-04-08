import { Request, Response } from "express";
import * as comicService from "../services/comic.service";

export const getComics = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as string;
    const sort = req.query.sort as string;

    const result = await comicService.getComics(
      page,
      limit,
      search,
      sort
    );

    return res.json(result);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};