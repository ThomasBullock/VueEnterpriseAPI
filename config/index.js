const config = {
  db: `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(
    process.env.DB_PASSWORD
  )}@${process.env.DB_URL}`,
  secret: process.env.SECRET,
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
  },
};

module.exports = config;
