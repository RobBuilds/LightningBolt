/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tbl_scan_instance', function(table) {
    table.string('guid').primary();
    table.string('name');
    table.string('seed_target');
    table.integer('created').defaultTo(0);
    table.integer('started').defaultTo(0);
    table.integer('ended').defaultTo(0);
    table.string('status');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tbl_scan_instance');
};
