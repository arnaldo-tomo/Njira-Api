import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('car', table => {
        table.increments('id').primary();
        table.string('registration', 20).notNullable();
        table.integer('capacity').notNullable();
        table.string('brand').notNullable();
        table.string('model').notNullable();
        table.string('cod_booklet').notNullable();
        table.decimal('balance', 19,2).notNullable().defaultTo(0);
        table.integer('idrout').unsigned().notNullable().references('id').inTable('rout');
        table.integer('iddriver').unsigned().notNullable().references('id').inTable('driver');
        table.integer('owner').unsigned().notNullable().references('id').inTable('owner');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('car');
}