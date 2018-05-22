const settings = require("./settings");
var prompt = require('prompt');

var knex = require('knex')({
  client: 'pg',
  version: '9.5.10',
  connection: {
    host : settings.host,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

prompt.start();

prompt.get(['first_name', 'last_name', 'birthdate'], function (err, result) {
  var first_name = result.first_name;
  var last_name = result.last_name;
  var birthdate = result.birthdate;
  knex('famous_people').insert({first_name: first_name, last_name: last_name, birthdate: birthdate}).then((val) => {
    knex('famous_people').select('*').then((val) => {
      console.log(val)
    })
    .catch((err) => {
      console.log(err.stack);
    });
  });
});




