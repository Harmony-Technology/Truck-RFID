"use strict";

class RegisterRequest {
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
      email: "required|email|unique:users",
      password: "required|confirmed|min:6|max:24",
      prenom: "required",
      nom: "required",
      telephone: "required | min:10 | max:10 | number | unique:users",
      addresse: "required",
      code_postal: "required",
    };
  }

  get messages() {
    return {
      "email.required": "You must provide a email field",
      "email.email": "Invalid email address",
      "email.unique": "Email deja utilisé",
      "password.confirmed": "Password Confirmation not same",
      "password.required": "You must provide a password field",
      "password.min": "Password doit etre au moins 6 caracteres",
      "password.max": "Password doit etre au plus 24 caracteres",
      "prenom.required": "You must provide a prenom field",
      "nom.required": "You must provide a nom field",
      "addresse.required": "You must provide a address field",
      "telephone.required": "You must provide a telephone field",
      "telephone.min": "telephone doit etre au moins 10 caracteres",
      "telephone.max": "telephone doit etre au plus 10 caracteres",
      "telephone.number": "telephone doit etre un nombre",
      "telephone.unique": "telephone est deja utilisé",
      "code_postal.required": "You must provide a code postal field",
    };
  }
}

module.exports = RegisterRequest;
