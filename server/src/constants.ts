import { EnvironmentVariables } from "./types";

export const TEN_YEARS = 1000 * 60 * 60 * 24 * 365 * 10;
export const SECRET = "secret";
export const AUTH_COOKIE = "auth-cookie";
export const env = process.env as EnvironmentVariables;
