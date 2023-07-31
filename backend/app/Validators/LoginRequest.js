"use strict";

class LoginRequest {
  get validateAll() {
    return true;
  }

  async fails(errorMessages) {
    return this.ctx.response.status(422).json({
      status: "error",
      message: errorMessages[0].message,
    });
  }

  get rules() {
    return {
      email: "required|email",
      password: "required",
    };
  }

  get messages() {
    return {
      "password.required": "You must provide a password field",
      "email.required": "You must provide a email field",
      "email.email": "You must provide a valid email address",
    };
  }
}

module.exports = LoginRequest;
