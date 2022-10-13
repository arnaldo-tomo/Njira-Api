import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('log_admin', table => {
        table.string('action').notNullable();
        table.dateTime('datetime').notNullable().defaultTo(knex.fn.now());
        table.integer('idadmin').unsigned().references('id').inTable('admin');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('log_admin');
}