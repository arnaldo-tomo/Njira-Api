import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('user_car', table => {
        table.integer('iduser').unsigned().references('id').inTable('user');
        table.integer('idcar').unsigned().references('id').inTable('car');
        table.integer('iddriver').unsigned().references('id').inTable('driver');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('user_car');
}