import { Request, Response } from 'express';
import * as comicService from '../services/comic.service';
import * as uploadService from '../services/upload.service';

export const getComics = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search as string;
        const sort = req.query.sort as string;

        const result = await comicService.getComics(page, limit, search, sort);

        return res.json(result);
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

export const createComic = async (req: Request, res: Response) => {
    try {
        const file = req.file;
        const title = req.body.title as string;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const result: any = await uploadService.uploadImage(file);
        const comic = await comicService.createComic(title, result.secure_url);

        return res.status(201).json(comic);
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

export const updateComic = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const file = req.file;
        const title = req.body.title as string;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        let imageUrl: string | undefined;
        if (file) {
            const result: any = await uploadService.uploadImage(file);
            imageUrl = result.secure_url;
        }

        const comic = await comicService.updateComic(
            Number(id),
            title,
            imageUrl
        );

        if (!comic) {
            return res.status(404).json({ message: 'Comic not found' });
        }

        return res.json(comic);
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

export const deleteComic = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const comic = await comicService.deleteComic(Number(id));

        if (!comic) {
            return res.status(404).json({ message: 'Comic not found' });
        }

        return res.status(200).json({ message: 'Comic deleted successfully' });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};
