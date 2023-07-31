"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TrucklogSchema extends Schema {
  up() {
    this.create("trucklogs", (table) => {
      table.increments();
      table.integer("truck_id").unsigned().references("id").inTable("trucks");
      table.string("plate_number");
      table.dateTime("in_time");
      table.dateTime("out_time");
      table.timestamps();
    });
  }

  down() {
    this.drop("trucklogs");
  }
}

module.exports = TrucklogSchema;
