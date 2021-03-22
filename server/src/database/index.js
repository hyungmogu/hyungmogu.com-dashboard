const { Pool } = require('pg');
const { user, host, database, password, port } = require('../../secrets/db_configuration');

// for local
// const pool = new Pool({
//     user: user,
//     host: host,
//     database: database,
//     password: password,
//     port: port
// });

// For server
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});


module.exports = pool;