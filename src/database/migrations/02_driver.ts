import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('driver', table => {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('lastname', 255).notNullable();
        table.string('phone', 16).notNullable();
        table.string('password', 255).notNullable();
        table.string('num_drive_card', 20).notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('driver');
}