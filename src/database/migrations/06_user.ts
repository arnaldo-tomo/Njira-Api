import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('user', table => {
        table.increments('id').primary();
        table.string('firstname', 255).notNullable();
        table.string('lastname', 255).notNullable();
        table.string('username', 60).notNullable();
        table.string('email', 255).notNullable();
        table.string('phone', 20).notNullable();
        table.string('password', 255).notNullable();
        table.decimal('balance', 19,2).defaultTo(0);
        table.boolean('state').defaultTo(false);  
        table.dateTime('last_connection');
        table.dateTime('created_at').defaultTo(knex.fn.now());
        table.dateTime('updated_at');
        table.string('salt', 255);
        table.boolean('verified').defaultTo(false);
    });
}

export async function down(Knex: Knex) {
    return Knex.schema.dropTable('user');
}