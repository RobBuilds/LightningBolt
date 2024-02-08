/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tbl_scan_log', function(table) {
    table.string('scan_instance_id').references('guid').inTable('tbl_scan_instance');
    table.integer('generated');
    table.string('component');
    table.string('type');
    table.string('message');

    // Add indexes for optimization
    table.index('scan_instance_id'); // Index for scan_instance_id column
    table.index('type'); // Index for type column
    // Add additional indexes as needed

  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tbl_scan_log');
};