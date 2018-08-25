module.exports = {
    HOST: process.env.HOST || "0.0.0.0",
    PORT: process.env.PORT || 3000,
    REDIS_URI: process.env.REDIS_URI,
    ENV: process.env.ENV || "dev",
}