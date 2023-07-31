"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RoleSchema extends Schema {
  up() {
    this.create("roles", (table) => {
      table.increments("role_id");
      table.string("role_name", 80).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("roles");
  }
}

module.exports = RoleSchema;
