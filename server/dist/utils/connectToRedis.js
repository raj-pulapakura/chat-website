"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToRedis = exports.cacheConfig = void 0;
const redis_1 = __importDefault(require("redis"));
const constants_1 = require("../constants");
exports.cacheConfig = {
    host: constants_1.env.REDIS_HOST,
    port: constants_1.env.REDIS_PORT,
};
const connectToRedis = () => {
    return new Promise((resolve, reject) => {
        console.log("CACHE CONFIG", exports.cacheConfig);
        const redisClient = redis_1.default.createClient(exports.cacheConfig);
        redisClient.on("connect", () => {
            console.log("connected to cache");
            resolve(redisClient);
        });
        redisClient.on("error", () => {
            reject("redis not available");
        });
    });
};
exports.connectToRedis = connectToRedis;
