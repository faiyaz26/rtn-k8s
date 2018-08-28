module.exports = {
    HOST: process.env.HOST || "0.0.0.0",
    PORT: process.env.PORT || 3000,
    REDIS_HOST: process.env.REDIS_HOST,
    ENV: process.env.ENV || "dev",
}