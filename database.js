const { Pool } = require('pg');

const database = new Pool(
    {
        host: 'db',
        port: 5432,
        user: 'admin',
        password: '@password21',
        database: 'docker_node_app'
    }
);

module.exports = database;