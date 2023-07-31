"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use("Route");

// Auth routes
Route.group(() => {
  Route.post("register", "AuthController.register");
  Route.post("login", "AuthController.login");
  Route.post("/refresh-token", "AuthController.refreshAccessToken");
  Route.post("update-password", "AuthController.updatePassword");
}).prefix("api/auth");

// User routes
Route.group(() => {
  Route.get("users/me", "UserController.show").middleware(["auth:jwt"]);
  Route.put("users/:user_id", "UserController.update");
  Route.get("users/count", "UserController.count");
}).prefix("api");

// Roles routes
Route.group(() => {
  Route.get("roles", "RoleController.index");
  Route.get("roles/:role_id", "RoleController.show").middleware(["auth:jwt"]);
}).prefix("api");

// Truck routes
Route.group(() => {
  Route.get("trucks", "TruckController.index");
  Route.post("/input", "TruckController.input");
  Route.post("/input/log", "TruckController.inputLog");
  Route.post("/output", "TruckController.output");
  Route.post("/output/log", "TruckController.outputLog");
}).prefix("api");

// Notification routes
Route.group(() => {
  Route.get("notifications", "NotificationController.index");
  Route.put(
    "notifications/mark-as-read",
    "NotificationController.markAllNotificationsAsRead"
  );
}).prefix("api");
