import { CallbackInfo } from "../src";
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    country: string;
}
export interface Verification {
    userId: string;
    transactionId: string;
    url: string;
    isCorrectUser: boolean;
    info: CallbackInfo | null;
}
