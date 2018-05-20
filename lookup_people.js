const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

var name = process.argv[2];

function print(outcome){
  let info = outcome;
  let str =(info.birthdate).toString();
  let birthdate = str.substr(0,15);
  console.log(info.first_name," ",info.last_name, ", born", birthdate)
}

const query = {
  // give the query a unique name
  name: 'fetch-user',
  text: 'SELECT * FROM famous_people WHERE first_name = $1',
  values: [name]
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
    client.query(query, (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        print(res.rows[0]);
      }
      client.end();
   })
});

