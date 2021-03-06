const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const login = async (req, res) => {

  const { email, password } = req.body;
 
  try {
    
    const usuarioDB = await Usuario.findOne({ email });
    

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "email no encontrado",
      });
    }
   
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    
    
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "password no valido",
      });
    }
    
    const token = await generarJWT(usuarioDB.id);
    
    res.json({
      ok: true,
      token
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const renewToken = async (req, res) => {

    console.log(req);
  const _id = req._id;
  console.log(_id);

  //generar el TOKEN JWT
  const token = await generarJWT(_id);

  // obtener usuario por _id
  const usuario = await Usuario.findById(_id);

  res.json({
    ok: true,
    token
  });
};

module.exports = {
  login,
  renewToken,
};