const { Router } = require("express");
const { check } = require("express-validator");
const {crearUsuario} = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/",
  [
    check("password", "El password es obligatorio").notEmpty(),
    check("email", "El Email es obligatorio").isEmail(),
    validarCampos,
  ],
  crearUsuario
);

module.exports = router;