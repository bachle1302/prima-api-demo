import prisma from "../prisma";

export const getComics = async (
  page: number,
  limit: number,
  search: string,
  sort: string
) => {
  const skip = (page - 1) * limit;

  // 🔥 filter search
  const where = {
    title: {
      contains: search,
    }
  };

  // 🔥 query data
  const comics = await prisma.comic.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      createdAt: sort === "asc" ? "asc" : "desc"
    }
  });

  // 🔥 đếm tổng
  const total = await prisma.comic.count({ where });

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