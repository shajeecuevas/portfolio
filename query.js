var pg = require("pg");
var connectionString = "postgres://postgres:qwerty@localhost:5432/postgres";
var pgClient = new pg.Client(connectionString);
pgClient.connect();

pgClient.query("CREATE TABLE IF NOT EXISTS blogPosts(id SERIAL UNIQUE PRIMARY KEY, date date NOT NULL default CURRENT_DATE, title varchar(255) NOT NULL, blogtext text NOT NULL)");

pgClient.end();