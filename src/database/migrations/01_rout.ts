import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('rout', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('terminal').notNullable();
        table.integer('num_of_cars').notNullable().defaultTo(0);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('rout');
}