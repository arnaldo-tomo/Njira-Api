import path from 'path';

const { DB_PORT, DB_USER, DB_PASSWORD } = process.env;

module.exports = {
    client: 'mysql',
    connection: {
      host: 'b2gfmihpbezpebbnwrqz-mysql.services.clever-cloud.com',
      port: 3306,
      user: 'ui0rxc4ssvtmcpyc',
      password: 'pzf5bkd4hL5hufxxKdQw',
      database: 'b2gfmihpbezpebbnwrqz',
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
      },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
      },
    useNullAsDefault: true,
};