import { body } from "express-validator";

export class UserValidation {
  static register = [
    body("email")
      .isEmail()
      .withMessage("El formato del correo electrónico no es válido")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),
    body("firstName")
      .isString()
      .withMessage("El nombre debe ser una cadena de texto"),
    body("lastName")
      .isString()
      .withMessage("El apellido debe ser una cadena de texto"),
    body("address")
      .isString()
      .withMessage("La dirección debe ser una cadena de texto"),
    body("birthDate")
      .isISO8601()
      .withMessage("La fecha de nacimiento debe ser una fecha válida")
      .toDate(),
  ];

  static login = [
    body("email")
      .isEmail()
      .withMessage("El formato del correo electrónico no es válido")
      .normalizeEmail(),
    body("password").notEmpty().withMessage("La contraseña es obligatoria"),
  ];

  static updateProfile = [
    body("firstName")
      .optional()
      .isString()
      .withMessage("El nombre debe ser una cadena de texto"),
    body("lastName")
      .optional()
      .isString()
      .withMessage("El apellido debe ser una cadena de texto"),
    body("address")
      .optional()
      .isString()
      .withMessage("La dirección debe ser una cadena de texto"),
    body("birthDate")
      .optional()
      .isISO8601()
      .withMessage("La fecha de nacimiento debe ser una fecha válida")
      .toDate(),
  ];

  static passwordResetRequest = [
    body("email")
      .isEmail()
      .withMessage("El formato del correo electrónico no es válido")
      .normalizeEmail(),
  ];

  static passwordChange = [
    body("token").notEmpty().withMessage("El token es obligatorio"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("La nueva contraseña debe tener al menos 6 caracteres"),
  ];
}
