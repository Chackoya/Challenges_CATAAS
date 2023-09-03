module.exports = {
    development: {
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "root",
      database: process.env.DB_DATABASE || "my_database",
      host: process.env.DB_HOST || "127.0.0.1",
      dialect: process.env.DB_DIALECT || "mariadb",
      port: process.env.DB_PORT || 3306
    },
    test: {
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || null,
      database: process.env.DB_DATABASE || "database_test",
      host: process.env.DB_HOST || "127.0.0.1",
      dialect: process.env.DB_DIALECT || "mysql"
    },
    production: {
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || null,
      database: process.env.DB_DATABASE || "database_production",
      host: process.env.DB_HOST || "127.0.0.1",
      dialect: process.env.DB_DIALECT || "mysql"
    }
  };
  