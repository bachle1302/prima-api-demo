import express from "express";
import * as comicController from "../controllers/comic.controller";

const router = express.Router();

router.get("/comics", comicController.getComics);

export default router;