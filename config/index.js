const config = {
  db: `mongodb://${process.env.DB_USER}:${encodeURIComponent(
    process.env.DB_PASSWORD
  )}@${process.env.DB_URL}`,
  // options: {
  //   keepAlive: 300000,
  //   connectTimeoutMS: 300000,
  //   useMongoClient: true
  // }
  secret: process.env.SECRET,
};

module.exports = config;
