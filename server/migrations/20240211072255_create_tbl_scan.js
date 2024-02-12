exports.up = function(knex) {
  return knex.schema.createTable('csv_scan', function(table) {
    table.increments('id').primary();
    table.text('Scan Name');
    table.text('Updated');
    table.text('Type');
    table.text('Module');
    table.text('Source');
    table.text('F/P');
    table.text('Data', 'longtext');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('csv_scan');
};
