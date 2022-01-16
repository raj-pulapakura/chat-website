import { Request, Response } from "express";

export type EnvironmentVariables = {
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_DATABASE: string;
  PORT: number;
} & NodeJS.ProcessEnv;

export interface Context {
  req: Request;
  res: Response;
}
