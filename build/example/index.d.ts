import { CallbackInfo } from "../src";
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    country: string;
}
export interface Verification {
    transactionId: string;
    userId: string;
    url: string;
    isCorrectUser: boolean;
    info: CallbackInfo | null;
}
