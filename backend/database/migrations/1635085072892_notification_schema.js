"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class NotificationSchema extends Schema {
  up() {
    this.create("notifications", (table) => {
      table.increments();
      table.string("message", 1000);
      table
        .integer("user_id", 10)
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE");

      table.boolean("is_read").defaultsTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop("notifications");
  }
}

module.exports = NotificationSchema;
