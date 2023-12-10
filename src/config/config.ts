export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  database_url: process.env.DATABASE_URL,
});
