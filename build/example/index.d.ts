import { CallbackInfo } from "../src";
declare module "express-session" {
    interface SessionData {
        userId: string;
    }
}
export interface User {
    id: string;
    country: string;
    email: string;
    username: string;
}
export interface Verification {
    userId: string;
    transactionId: string;
    url: string;
    isCorrectUser: boolean;
    info: CallbackInfo | null;
}
