const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongo://127.0.0.1:27017/contactbook"
    }
};

module.exports = config;