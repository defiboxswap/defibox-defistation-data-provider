module.exports = {
    apps: {
        name: "defibox-defistation-data-provider",
        script: "index.ts",
        interpreter: "ts-node",
        autorestart: true,
        log_date_format : "YYYY-MM-DD HH:mm:ss",
    }
};
