/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tbl_scan_correlation_results', function(table) {
    table.string('id').primary();
    table.string('scan_instance_id').references('guid').inTable('tbl_scan_instance');
    table.string('title');
    table.string('rule_risk');
    table.string('rule_id');
    table.string('rule_name');
    table.string('rule_descr');
    table.string('rule_logic');

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
  return knex.schema.dropTableIfExists('tbl_scan_correlation_results');
};
