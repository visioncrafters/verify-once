import { User } from "../example";

// extend express session with custom properties
declare global {
  namespace Express {
    interface Session {
      // logged in user
      user: User | null;
    }
  }
}
