declare module express {
  namespace Express {
    interface Session {
      userId?: string;
    }
  }
}
