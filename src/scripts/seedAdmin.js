import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/middleware";
async function seedAdmin() {
    const adminData = {
        name: `${process.env.ADMIN_NAME}`,
        email: `${process.env.ADMIN_EMAIL}`,
        role: UserRole.ADMIN,
        password: `${process.env.ADMIN_PASSWORD}`
    };
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: adminData.email
            }
        });
        if (existingUser) {
            throw new Error(' user already exist');
        }
        const signUpAdmin = await fetch(`${process.env.BETTER_AUTH_URL}/api/auth/sign-up/email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "origin": `${process.env.APP_URL}`
            },
            body: JSON.stringify(adminData)
        });
        console.log(signUpAdmin);
        // console.log(adminData);
        if (signUpAdmin.ok) {
            console.log("**** Admin created");
            await prisma.user.update({
                where: {
                    email: adminData.email
                },
                data: {
                    emailVerified: true
                }
            });
            console.log("**** Email verification status updated!");
        }
        //   console.log("******* SUCCESS ******")
    }
    catch (e) {
        console.log(e);
    }
}
seedAdmin();
//# sourceMappingURL=seedAdmin.js.map