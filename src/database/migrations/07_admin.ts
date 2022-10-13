import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('admin', table => {
        table.increments('id').primary();
        table.string('firstname', 45).notNullable();
        table.string('lastname', 45).notNullable();
        table.string('password', 255).notNullable();
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('admin');
}