"use strict";

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Hash = use("Hash");

Factory.blueprint("App/Models/User", async (faker) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: "12345678",
    user_role_id: faker.integer({ min: 1, max: 2 }),
    phone: faker.phone({ formatted: false }),
    first_name: faker.name(),
    last_name: faker.name(),
    image: faker.avatar(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
});

Factory.blueprint("App/Models/Role", async (faker, i, data) => {
  const names = ["admin", "client"];
  return {
    role_name: names[i],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
});
