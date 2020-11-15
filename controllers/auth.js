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
    console.log(token);
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

module.exports = {
  login
};