import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('travel', table => {
        table.increments('id').primary();
        table.integer('rate');
        table.float('boarding', 10,6).notNullable();
        table.float('landing', 10,6).notNullable();
        table.integer('idcar').unsigned().references('id').inTable('car');
        table.integer('iduser').unsigned().references('id').inTable('user');
        table.integer('idpayment').unsigned().references('id').inTable('payment');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('travel');
}