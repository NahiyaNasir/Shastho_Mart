import { auth as betterAuth } from "../lib/auth";
export var UserRole;
(function (UserRole) {
    UserRole["CUSTOMER"] = "CUSTOMER";
    UserRole["SELLER"] = "SELLER";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole || (UserRole = {}));
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const session = await betterAuth.api.getSession({
                headers: req.headers
            });
            //  console.log(session);
            if (!session) {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized!"
                });
            }
            if (!session.user.emailVerified) {
                return res.status(403).json({
                    success: false,
                    message: "Email verification required. Please verify your email!"
                });
            }
            req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                role: session.user.role,
                emailVerified: session.user.emailVerified
            };
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden! You don't have permission to access this resources!"
                });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
export default auth;
//# sourceMappingURL=middleware.js.map