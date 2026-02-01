export declare const auth: import("better-auth").Auth<{
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth").DBAdapter<import("better-auth").BetterAuthOptions>;
    trustedOrigins: string[];
    user: {
        additionalFields: {
            role: {
                type: "string";
                defaultValue: string;
            };
            phone: {
                type: "string";
                required: false;
            };
        };
    };
    emailAndPassword: {
        enabled: true;
        requireEmailVerification: true;
    };
    socialProviders: {
        google: {
            prompt: "select_account";
            accessType: "offline";
            clientId: string;
            clientSecret: string;
        };
    };
}>;
//# sourceMappingURL=auth.d.ts.map