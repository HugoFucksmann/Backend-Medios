const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { getCovid } = require("../controllers/covid");

const router = Router();

router.get("/", getCovid);

router.post(
  "/",
  [
    validarJWT,
    check("contagios", "los contagios es obligatorio").notEmpty(),
    check("alta", "el alta es obligatorio").notEmpty(),
    check("negativos", "los negativos es obligatorio").notEmpty(),
    validarCampos,
  ],
  crearNoticia
);

router.put(
  "/:dia",
  [
    validarJWT,
    check("contagios", "los contagios es obligatorio").notEmpty(),
    check("alta", "el alta es obligatorio").notEmpty(),
    check("negativos", "los negativos es obligatorio").notEmpty(),
    validarCampos,
  ],
  actualizarNoticia
);

router.delete("/:dia", validarJWT, borrarDiaCovid);

module.exports = router;
