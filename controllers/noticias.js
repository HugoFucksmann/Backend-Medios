const { response } = require("express");
const Noticias = require("../models/noticias");

const getNoticias = async (req, res) => {
    const noticias = await Noticias.find();
    res.json({
      ok: true,
      noticias
    });
}

const crearNoticia = async (req, res) => {
  const noticias = new Noticias({
    ...req.body
  });

  try {
    const noticiasDB = await noticias.save();

    res.json({
      ok: true,
      noticias: noticiasDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error inesperado, hable con el administrador",
    });
  }
}

const actualizarNoticia = async (req, res = response) => {
  const noticiaId = req.params.id;

  try {
    const noticiasDB = await Noticias.findById(noticiaId);
    if (!noticiasDB) {
      return res.status(404).json({
        ok: false,
        msg: "Noticia no encontrada",
      });
    }
    const cambiosNoticia = {
      ...req.body,
    };

    const noticiaActualizada = await Noticias.findByIdAndUpdate(
      noticiaId,
      cambiosNoticia,
      { new: true }
    );

    res.json({
      ok: true,
      noticiaActualizada,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error hable con el admin",
    });
  }
};

const borrarNoticia = async (req, res = response) => {
  const noticiaId = req.params.id;

  try {
    const noticiasDB = await Noticias.findById(noticiaId);

    if (!noticiasDB) {
      return res.status(404).json({
        ok: false,
        msg: "noticia no encontrada",
      });
    }

    await Noticias.findByIdAndDelete(noticiaId);

    res.json({
      ok: true,
      msg: "noticia eliminada",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error hable con el admin",
    });
  }
};


module.exports = {
  getNoticias,
  crearNoticia,
  actualizarNoticia,
  borrarNoticia,
};