/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tbl_config', function(table) {
    table.string('scope');
    table.string('opt');
    table.string('val');
    table.primary(['scope', 'opt']);  // Adding a composite primary key
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tbl_config');
};
