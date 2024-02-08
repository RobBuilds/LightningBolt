/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tbl_event_types', function (table) {
    table.string('event').primary();
    table.string('event_descr');
    table.integer('event_raw');
    table.string('event_type');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tbl_event_types');
};
