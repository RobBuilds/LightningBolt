/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  // Add unique constraint to 'hash' column in 'tbl_scan_results' table
  await knex.schema.alterTable('tbl_scan_results', function(table) {
    table.string('hash').unique().alter();
  });

  // Then create 'tbl_scan_correlation_results_events' table
  return knex.schema.createTable('tbl_scan_correlation_results_events', function(table) {
    table.string('correlation_id').references('id').inTable('tbl_scan_correlation_results');
    table.string('event_hash').references('hash').inTable('tbl_scan_results');
    // Add indexes for optimization
    table.index('correlation_id');
    table.index('event_hash');
    // Define primary key
    table.primary(['correlation_id', 'event_hash']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  // Drop 'tbl_scan_correlation_results_events' table
  await knex.schema.dropTableIfExists('tbl_scan_correlation_results_events');

  // Then remove unique constraint from 'hash' column in 'tbl_scan_results' table
  return knex.schema.alterTable('tbl_scan_results', function(table) {
    table.dropUnique('hash');
  });
};