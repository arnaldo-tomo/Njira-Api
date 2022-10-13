import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('ticketCollector', table => {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('lastname', 255).notNullable();
        table.string('phone', 20);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('ticketCollector');
}