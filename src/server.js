import app from "./app";
import { prisma } from "./lib/prisma";
const PORT = process.env.PORT || 5000;
async function main() {
    try {
        await prisma.$connect();
        console.log('server is running');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.log('an encrusted happen', error);
        await prisma.$disconnect();
        process.exit(1);
    }
}
main();
//# sourceMappingURL=server.js.map