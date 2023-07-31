"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", (table) => {
      table.increments("user_id");
      table.string("username", 80).notNullable().unique();
      table.string("email", 80).notNullable().unique();
      table.string("password", 60).notNullable();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("image").notNullable();
      table
        .integer("user_role_id")
        .unsigned()
        .notNullable()
        .references("role_id")
        .inTable("roles");
      table.string("phone");
      table.datetime("recently_logged");
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
