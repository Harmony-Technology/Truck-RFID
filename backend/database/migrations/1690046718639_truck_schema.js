"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TruckSchema extends Schema {
  up() {
    this.create("trucks", (table) => {
      table.increments();
      table.string("tag").notNullable();
      table.boolean("checked").defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop("trucks");
  }
}

module.exports = TruckSchema;
