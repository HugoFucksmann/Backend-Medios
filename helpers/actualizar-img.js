const fs = require("fs");
const Noticias  = require('../models/noticias');


const borrarImagen = (path) => {
  if (fs.existsSync(path)) {
    //borrar la img anterior
    fs.unlinkSync(path);
  }
};
//al ser async devuelve promesa
const actualizarImagen = async (tipo, id, path, nombreArchivo) => {
  let pathViejo = "";

  switch (tipo) {
    case "noticias":
      const noticia = await Noticias.findById(id);
      if (!noticia) {
        console.log("no se encontro noticia con ese id");
        return false;
      }

      pathViejo = `../uploads/noticias/${noticia.imagen}`;

      borrarImagen(pathViejo);

      noticia.imagen = nombreArchivo;
      await noticia.save();
      return true;

      break;
  }
};

module.exports = {
  actualizarImagen,
};
