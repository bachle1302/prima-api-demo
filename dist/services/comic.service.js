"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComics = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const getComics = async (page, limit, search, sort) => {
    const skip = (page - 1) * limit;
    // 🔥 filter search
    const where = {
        title: {
            contains: search,
        }
    };
    // 🔥 query data
    const comics = await prisma_1.default.comic.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
            createdAt: sort === "asc" ? "asc" : "desc"
        }
    });
    // 🔥 đếm tổng
    const total = await prisma_1.default.comic.count({ where });
    return {
        data: comics,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
};
exports.getComics = getComics;
