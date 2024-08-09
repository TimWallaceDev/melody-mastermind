/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {username: 'john'},
    {username: 'peter'},
    {username: 'homer'},
    {username: 'bart'},
    {username: 'lisa'},
    {username: 'marge'},
    {username: 'maggie'},
  ]);
};
