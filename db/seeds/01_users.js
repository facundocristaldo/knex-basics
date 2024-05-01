/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    { id: 1, name: "Facundo", email: "Facundo@mail.com" },
    { id: 2, name: "Agustin", email: "Agustin@mail.com" },
    { id: 3, name: "Franco", email: "Franco@mail.com" },
  ]);
};
