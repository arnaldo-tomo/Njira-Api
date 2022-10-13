import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('log_owner', table => {
        table.increments('id').primary();
        table.string('action').notNullable();
        table.integer('owner').unsigned().references('id').inTable('owner');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('log_owner');
}