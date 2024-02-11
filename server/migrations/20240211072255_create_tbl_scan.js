exports.up = function(knex) {
  return knex.schema.createTable('csv_scan', function(table) {
    table.increments('id').primary();
    table.text('Data');
    table.string('FP', 250);
    table.string('Module', 250);
    table.string('ScanName', 250);
    table.string('Source', 250);
    table.string('Type', 250);
    table.timestamp('Updated');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('csv_scan');
};
