import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('ticketColletor_car', table => {
        table.integer('idticketCollector').unsigned().references('id').inTable('ticketCollector');
        table.integer('idcar').unsigned().references('id').inTable('car');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('ticketCollector_car');
}