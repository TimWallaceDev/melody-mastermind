/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
function up(knex) {
    return knex.schema.createTable("playlists", (table) => {
        table.string("id").primary()
        table.string("name").notNullable()
        table.string("image_url").notNullable()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
function down(knex) {
    return knex.schema.dropTable("playlists")
};

export {up, down}
