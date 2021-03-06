const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");


const crearUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya esta registrado",
      });
    }

    const usuario = new Usuario(req.body);

    //* Encriptar contrasegna
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    //Generar TOKEN - JWT
    const token = await generarJWT(usuario.id);
    
    res.json({
        ok: true,
        msg: 'usuario creado',
        token
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado...",
    });
  }
};


module.exports = {
  crearUsuario
};