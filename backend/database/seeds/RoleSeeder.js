"use strict";

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class RoleSeeder {
  async run() {
    const roles = await Factory.model("App/Models/Role").createMany(2);
  }
}

module.exports = RoleSeeder;
