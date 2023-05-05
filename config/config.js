module.exports = {
  development: {
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || 'Y4jlLbEiqKZmCIo4Caax',
    database: process.env.DB_NAME || 'ubaid_new',
    host: process.env.DB_HOST || 'project2023.ccmd6j6rmnku.us-east-1.rds.amazonaws.com',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
  },
  // Other environments (e.g., production, test) go here.
};
