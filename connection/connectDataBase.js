const Pg = require("pg");
const pg = new Pg({
    user: '{user}',
    host: '{host}',
    database: '{database}',
    password: '{password}',
    port: { port },
});

pg.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pg.end()
});