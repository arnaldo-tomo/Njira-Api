import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('payment', table => {
        table.increments('id').primary();
        table.dateTime('date').notNullable().defaultTo(knex.fn.now());
        table.integer('car').unsigned().notNullable().references('id').inTable('car');
        table.integer('user').unsigned().notNullable().references('id').inTable('user');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('payment');
}