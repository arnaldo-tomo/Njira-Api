import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('claim_admin', table => {
        table.increments('id').primary();
        table.string('token');
        table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('claim_admin');
}