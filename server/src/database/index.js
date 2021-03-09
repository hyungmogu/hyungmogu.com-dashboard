const { Pool } = require('pg');
const { user, host, database, password, port } = require('../../secrets/db_configuration');

const pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port
});


module.exports = pool;