
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', function(table){
      table.integer('person_id').notNullable().references('id').inTable('famous_people');
    })
  ])
};

exports.down = function(knex, Promise) {
    return knex.schema.table('milestones', function(t) {
        t.dropColumn('person_id');
    });
};
