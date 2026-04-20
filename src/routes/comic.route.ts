import express from 'express';
import { authMiddleware } from './../middlewares/auth.middlewares';
import * as comicController from '../controllers/comic.controller';
import { upload } from '../middlewares/upload.middleware';

const router = express.Router();

router.get('/comics', comicController.getComics);
router.post(
    '/comics',
    authMiddleware,
    upload.single('file'),
    comicController.createComic
);
router.put(
    '/comics/:id',
    authMiddleware,
    upload.single('file'),
    comicController.updateComic
);
router.delete('/comics/:id', authMiddleware, comicController.deleteComic);

export default router;
