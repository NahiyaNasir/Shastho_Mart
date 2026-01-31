import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";




export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),


     trustedOrigins: [process.env.APP_URL!],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
      },
      phone: {
        type: "string",
        required: false,
      },
    },
    
  },
    emailAndPassword: {    
        enabled: true,
            redirects: { signIn: process.env.APP_URL as string, signUp: process.env.APP_URL as string },
   
   
      } ,
     socialProviders: {
      
        google: { 
           prompt: "select_account", 
         accessType: "offline", 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },


});


