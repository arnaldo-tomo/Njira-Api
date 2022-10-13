//import knex from 'knex';
import Knex from 'knex';

const { DB_PORT, DB_USER, DB_PASSWORD } = process.env;

const connection = Knex({
    client: 'mysql',
    connection: {
        host: 'b2gfmihpbezpebbnwrqz-mysql.services.clever-cloud.com',
        port: 3306,
        user: 'ui0rxc4ssvtmcpyc',
        password: 'pzf5bkd4hL5hufxxKdQw',
        database: 'b2gfmihpbezpebbnwrqz',
    },
    useNullAsDefault: true,
});

 export default connection;