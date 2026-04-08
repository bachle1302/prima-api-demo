import prisma from "../prisma";

export const getMe = async (userId: number) =>{
    const user = await prisma.user.findUnique({
        where:{id: userId},
        select: {
            id: true,
            email: true,
            createdAt: true,
            role: true,
            refreshTokens: {
                select: {
                    token: true,
                    userAgent: true,
                    ip: true,
                    expiresAt: true,
                }
            }
        }
    })
    return user;
}

