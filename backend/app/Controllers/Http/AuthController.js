"use strict";
const User = use("App/Models/User");
const Role = use("App/Models/Role");
const Hash = use("Hash");
const jwt = use("jsonwebtoken");

const { tmpdir } = require("os");
const { join } = require("path");
const cloudinary = require("cloudinary").v2;
const cloudinaryConfig = require("../../../config/cloudinary");

cloudinary.config({
  cloud_name: cloudinaryConfig.cloud_name,
  api_key: cloudinaryConfig.api_key,
  api_secret: cloudinaryConfig.api_secret,
});

class AuthController {
  async register({ request, response }) {
    try {
      const userData = request.only([
        "email",
        "password",
        "first_name",
        "last_name",
        "phone",
        "image",
        "role_id",
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
            folder: "user_images",
          }
        );

        userData.user_image = result.secure_url;
      }

      const user = await User.create(userData);
      return response.json(user);
    } catch (error) {
      console.error(error);

      return response.status(500).send({
        error: "There was a problem creating the user, please try again later.",
      });
    }
  }

  async login({ request, auth, response }) {
    try {
      const { email, password } = request.all();

      const user = await User.findBy("email", email);

      if (!user) {
        return response.status(404).send({ error: "User not found" });
      }

      const userRoleName = await Role.findBy("role_id", user.user_role_id);

      const isPasswordValid = await Hash.verify(password, user.password);

      if (!isPasswordValid) {
        return response.status(401).send({ error: "Invalid password" });
      }

      const token = await auth.withRefreshToken().generate(user);

      const decodedToken = jwt.decode(token.token);

      user.recently_logged = new Date();
      await user.save();

      const userWithoutPassword = {
        user_id: user.user_id,
        email: user.email,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        image: user.image,
        role_id: user.user_role_id,
      };

      return response.json({
        user: userWithoutPassword,
        role: userRoleName.role_name,
        token: token.token,
        accessTokenExpiry: new Date(decodedToken.exp * 1000),
        refreshToken: token.refreshToken,
      });
    } catch (error) {
      console.error(error);

      return response.status(500).send({ error: "Server error" });
    }
  }

  async refreshAccessToken({ request, auth, response }) {
    try {
      const refreshToken = request.input("refresh_token");

      if (!refreshToken) {
        return response.status(400).send({ error: "Refresh token missing" });
      }

      const newToken = await auth.generateForRefreshToken(refreshToken);

      const decodedToken = jwt.decode(newToken.token);

      Object.assign({
        accessToken: newToken.token,
        refreshToken: newToken.refreshToken,
        accessTokenExpiry: new Date(decodedToken.exp * 1000),
      });

      return response.json({
        token: newToken.token,
        accessTokenExpiry: new Date(decodedToken.exp * 1000),
        refreshToken: newToken.refreshToken,
      });
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .send({ error: "Server error", message: error.message });
    }
  }

  async updatePassword({ request, auth, response }) {
    const user = await auth.getUser();
    const { oldPassword, newPassword } = request.only([
      "oldPassword",
      "newPassword",
    ]);

    try {
      await auth.attempt(user.email, oldPassword);
      user.password = newPassword;
      await user.save();

      return response
        .status(200)
        .send({ message: "Password updated successfully." });
    } catch (error) {
      return response.status(401).send({ message: "Invalid credentials." });
    }
  }
}

module.exports = AuthController;
