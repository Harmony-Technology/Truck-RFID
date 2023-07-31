"use strict";
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");

const { tmpdir } = require("os");
const { join } = require("path");
const cloudinary = require("cloudinary").v2;
const cloudinaryConfig = require("../../../config/cloudinary");

cloudinary.config({
  cloud_name: cloudinaryConfig.cloud_name,
  api_key: cloudinaryConfig.api_key,
  api_secret: cloudinaryConfig.api_secret,
});

class UserController {
  // update user profile
  async update({ params, request, response }) {
    try {
      const user = await User.find(params.user_id);
      const { username, first_name, last_name, email, password, phone } =
        request.only([
          "username",
          "first_name",
          "last_name",
          "email",
          "password",
          "phone",
        ]);

      // Upload user image to Cloudinary
      const imageFile = request.file("image", {
        types: ["image"],
        size: "2mb",
      });

      if (imageFile) {
        await imageFile.move(tmpdir(), {
          name: `${new Date().getTime()}.${imageFile.subtype}`,
          overwrite: true,
        });

        if (!imageFile.moved()) {
          throw new Error("Failed to upload user image");
        }

        const result = await cloudinary.uploader.upload(
          join(tmpdir(), imageFile.fileName),
          {
            folder: "user_images_truck",
          }
        );

        user.image = result.secure_url;
      }

      user.username = username;
      user.first_name = first_name;
      user.last_name = last_name;
      user.email = email;
      user.password = password;
      user.phone = phone;
      user.image = user.image;
      user.updated_at = new Date();
      await user.save();
      return response.json(user);
    } catch (error) {
      console.log(error),
        response.status(500).send({
          error:
            "There was a problem updating the user, please try again later.",
        });
    }
  }

  // get user profile
  async show({ auth, response }) {
    // get the user who is logged in
    try {
      const user = await auth.getUser();
      console.log(user);
      return response.json(user);
    } catch (error) {
      console.log(error),
        response.status(500).send({
          error:
            "There was a problem getting the user, please try again later.",
        });
    }
  }

  // get users count
  async count({ response }) {
    try {
      const userCount = await User.query().getCount("user_id");
      return response.json(userCount);
    } catch (error) {
      console.log(error),
        response.status(500).send({
          error: `Error: ${error.message}`,
        });
    }
  }
}

module.exports = UserController;
