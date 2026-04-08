import { authMiddleware } from './../middlewares/auth.middlewares';
import express from "express"
import { uploadImage } from "../controllers/upload.controller";
import { upload } from '../middlewares/upload.middleware';

const router = express.Router();
router.post("/upload",authMiddleware,upload.single("file"), uploadImage);

export default router;