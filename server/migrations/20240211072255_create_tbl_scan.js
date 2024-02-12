exports.up = function(knex) {
  return knex.schema.createTable('csv_scan', function(table) {
    table.increments('id').primary();
    table.text('data');
    table.string('f/p');
    table.string('module');
    table.string('scanName');
    table.string('source');
    table.string('type');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('csv_scan');
};
