import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('owner', table => {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('lastname', 255).notNullable();
        table.string('email', 255);
        table.string('phone',20).notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('owner');
}