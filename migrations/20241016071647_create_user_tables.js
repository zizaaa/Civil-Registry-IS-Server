/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('users', (table)=>{
        table.increments('id').primary();
        table.string('username', 20).notNullable().unique();
        table.string('name', 50).notNullable();
        table.string('email').notNullable().unique(); 
        table.string('password').notNullable();
        table.string('token').unique();
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('users');
};
