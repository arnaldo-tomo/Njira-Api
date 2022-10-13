import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('log_car', table => {
        table.string('action').notNullable();
        table.dateTime('datetime').notNullable().defaultTo(knex.fn.now());
        table.integer('idcar').unsigned().references('id').inTable('car');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('log_car');
}