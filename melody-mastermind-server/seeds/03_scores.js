/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('scores').del()
  await knex('scores').insert([
    {user_id: 3, playlist_id: '5ABHKGoOzxkaa28ttQV9sE', score: 5504},
    {user_id: 3, playlist_id: '5ABHKGoOzxkaa28ttQV9sE', score: 4503},
    {user_id: 3, playlist_id: '5ABHKGoOzxkaa28ttQV9sE', score: 6675},
    {user_id: 3, playlist_id: '5ABHKGoOzxkaa28ttQV9sE', score: 6902},
    {user_id: 3, playlist_id: '5ABHKGoOzxkaa28ttQV9sE', score: 2123},
    {user_id: 3, playlist_id: '5ABHKGoOzxkaa28ttQV9sE', score: 4123},
    {user_id: 3, playlist_id: '5ABHKGoOzxkaa28ttQV9sE', score: 5534},
    {user_id: 3, playlist_id: '5ABHKGoOzxkaa28ttQV9sE', score: 8093},
    {user_id: 3, playlist_id: '5ABHKGoOzxkaa28ttQV9sE', score: 9387},
    {user_id: 3, playlist_id: '5ABHKGoOzxkaa28ttQV9sE', score: 1302},
  ]);
};
