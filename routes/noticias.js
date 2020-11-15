const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { getNoticias, crearNoticia, actualizarNoticia, borrarNoticia, } = require("../controllers/noticias");

const router = Router();

router.get('/', getNoticias);

router.post(
  "/",
  [
    validarJWT,
    check("titulo", "el titulo es obligatorio").notEmpty(),
    check("subtitulo", "el subtitulo es obligatorio").notEmpty(),
    check("texto", "el texto es obligatorio").notEmpty(),
    check("imagen", "la imagen es obligatorio").notEmpty(),
    validarCampos,
  ],
  crearNoticia
);

router.put('/:id',
    [
        validarJWT,
        check('titulo', 'el titulo de la noticia es necesario').notEmpty(),
        validarCampos
    ],
    actualizarNoticia
);

router.delete("/:id",validarJWT, borrarNoticia);

module.exports = router;