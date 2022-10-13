import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('log_user', table => {
        table.string('action').notNullable();
        table.dateTime('datetime').notNullable().defaultTo(knex.fn.now());
        table.integer('iduser').unsigned().references('id').inTable('user');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('log_user');
}