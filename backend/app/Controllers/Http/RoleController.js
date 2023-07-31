"use strict";
const Role = use("App/Models/Role");

class RoleController {
  async store({ request, response }) {
    try {
      const role = await Role.create(request.only(["role_name"]));

      return response.json(role);
    } catch (error) {
      console.error(error);

      return response.status(500).send({
        error: "There was a problem creating the role, please try again later.",
      });
    }
  }

  async index({ request, response }) {
    try {
      const roles = await Role.all();

      return response.json(roles);
    } catch (error) {
      console.error(error);

      return response.status(500).send({
        error:
          "There was a problem retrieving the roles, please try again later.",
      });
    }
  }

  //get role by id
  async show({ request, response }) {
    try {
      const role = await Role.find(request.params.role_id);
      if (!role) {
        return response.status(404).send({
          error: "No role found",
        });
      }
      return response.json(role);
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error:
          "There was a problem retrieving the role, please try again later.",
      });
    }
  }

  async update({ request, response, params }) {
    try {
      const role = await Role.find(params.role_id);

      if (!role) {
        return response.status(404).json({
          message: "Role not found",
        });
      }

      role.role_name = request.input("role_name");

      await role.save();

      return response.json(role);
    } catch (error) {
      console.error(error);

      return response.status(500).send({
        error: "There was a problem updating the role, please try again later.",
      });
    }
  }

  async destroy({ request, response, params }) {
    try {
      const role = await Role.find(params.role_id);

      if (!role) {
        return response.status(404).json({
          message: "Role not found",
        });
      }

      await role.delete();

      return response.json({
        message: "Role deleted",
      });
    } catch (error) {
      console.error(error);

      return response.status(500).send({
        error: "There was a problem deleting the role, please try again later.",
      });
    }
  }
}

module.exports = RoleController;
