/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
function up(knex) {
  return knex.schema.createTable("scores", (table) => {
    table.increments("id").primary()
    table.integer("user_id").unsigned().references("users.id").onUpdate("CASCADE").onDelete("CASCADE")
    table.integer("score").notNullable()
    table.string("playlist_id").references("playlists.id").onUpdate("CASCADE").onDelete("CASCADE")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
function down(knex) {
  return knex.schema.dropTable("scores")
};

export {up, down}
