/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      // ID
      table.increments("id", { primaryKey: true });

      // column 'name'
      // type string
      // not null
      table.string("name").notNullable();

      // column 'email'
      // type string
      // not null
      table.string("email").notNullable();

      // column 'created_at'
      // type timespamp
      // not null
      // default value to current datetime
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
      table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    })
    .createTable("todos", function (table) {
      table.increments("id", { primaryKey: true });
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
      table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
      table.string("title").notNullable();
      table.boolean("completed").notNullable().defaultTo(false);
      //foreign key to table users
      table.integer("user_id").unsigned().references("id").inTable("users");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("todos").dropTable("users");
};
