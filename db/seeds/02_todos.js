/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("todos").del();
  await knex("todos").insert([
    { id: 1, title: "Cook", user_id: 1 },
    { id: 2, title: "Laundry", user_id: 1 },
    { id: 3, title: "Swipe", user_id: 1 },
    { id: 4, title: "Make the bed", user_id: 2 },
    { id: 5, title: "Read 30mins", user_id: 3 },
    { id: 6, title: "Wash the dishes", user_id: 2 },
  ]);
};
