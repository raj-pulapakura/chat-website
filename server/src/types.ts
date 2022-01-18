import { Request, Response } from "express";
import { Session, SessionData } from "express-session";

export type EnvironmentVariables = {
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_DATABASE: string;
  PORT: number;
} & NodeJS.ProcessEnv;

export interface Context {
  req: Request & {
    session: Session &
      Partial<SessionData> & { accountId: string; adminLoggedIn: boolean };
  };
  res: Response;
}
