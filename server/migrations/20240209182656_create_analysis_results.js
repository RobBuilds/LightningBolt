/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('analysis_results', function(table) {
      table.increments('id').primary();
      table.text('data');
      table.timestamps(true, true); // Adds created_at and updated_at timestamps
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('analysis_results');
  };
