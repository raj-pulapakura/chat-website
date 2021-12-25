import redis from "redis";
import { env } from "../../constants";

export const cacheConfig = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
};

export const connectToRedis = (): Promise<redis.RedisClient> => {
  return new Promise((resolve, reject) => {
    console.log("CACHE CONFIG", cacheConfig);
    const redisClient = redis.createClient(cacheConfig);

    redisClient.on("connect", () => {
      console.log("connected to cache");
      resolve(redisClient);
    });

    redisClient.on("error", () => {
      reject("redis not available");
    });
  });
};
