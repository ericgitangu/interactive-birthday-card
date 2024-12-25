import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { DefaultAccount } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: string; // Custom property
        } & DefaultSession["user"];
        accessToken?: string; // Include access token if needed
    }

    interface User extends DefaultUser {
        id: string; // Ensure ID is present in User
        role?: string; // Example custom property
        isVerified?: boolean; // Example custom property
    }

    interface Account extends DefaultAccount {
        accessToken?: string; // OAuth access token
        refreshToken?: string; // OAuth refresh token
        expires_at?: number; // Token expiration time
    }

    interface Profile {
        locale?: string; // Locale of the user
        timezone?: string; // User's timezone
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role?: string; // Custom property
        accessToken?: string; // Include access token
        refreshToken?: string; // Include refresh token
    }
}
