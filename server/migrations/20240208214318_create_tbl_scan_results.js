/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tbl_scan_results', function(table) {
    table.string('scan_instance_id').references('guid').inTable('tbl_scan_instance');
    table.string('hash');
    table.string('type').references('event').inTable('tbl_event_types');
    table.integer('generated');
    table.integer('confidence').defaultTo(100);
    table.integer('visibility').defaultTo(100);
    table.integer('risk').defaultTo(0);
    table.string('module');
    table.string('data');
    table.integer('false_positive').defaultTo(0);
    table.string('source_event_hash').defaultTo('ROOT');

    // Add indexes for optimization
    table.index('scan_instance_id');
    table.index('type');

    // You can add additional indexes for other columns if needed

  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tbl_scan_results');
};
