import { Session, SessionData } from "express-session";
import { RedisClient } from "redis";

export type EnvironmentVariables = {
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_DATABASE: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
} & NodeJS.ProcessEnv;

export interface Context {
  req: Request & {
    session: Session & Partial<SessionData> & { userId: number };
  };
  res: Response;
  redis: RedisClient;
}
