"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.user.createMany({
        data: [
            {
                email: "admin@gmail.com",
                password: "123456",
            },
            {
                email: "user1@gmail.com",
                password: "123456",
            },
            {
                email: "user2@gmail.com",
                password: "123456",
            },
        ],
    });
    console.log("✅ Seed data inserted");
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
