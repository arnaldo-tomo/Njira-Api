import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('package', table => {
        table.increments('id').notNullable();
        table.string('name', 60).notNullable();
        table.decimal('price', 19,2).notNullable().defaultTo(0);
        table.dateTime('terminate');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('package');
}