export default () => ({
  DB_PORT: +(process.env.MYSQL_PORT || 3306),
  DB_HOST: process.env.MYSQL_HOST || "localhost",
  DB_DATABASE: process.env.MYSQL_DATABASE || "back-end",
  DB_USERNAME: process.env.MYSQL_USERNAME || "root",
  DB_PASSWORD: process.env.MYSQL_PASSWORD,
});
