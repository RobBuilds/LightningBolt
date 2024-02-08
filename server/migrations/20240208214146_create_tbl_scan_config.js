/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tbl_scan_config', function(table) {
    table.string('scan_instance_id').references('guid').inTable('tbl_scan_instance');
    table.string('component');
    table.string('opt');
    table.string('val');

    // Add index for optimization
    table.index('scan_instance_id');

    // You can add additional indexes for other columns if needed

  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tbl_scan_config');
};
