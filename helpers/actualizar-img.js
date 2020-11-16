const fs = require("fs");
const Noticias = require('../models/noticias');

const borrarImagen = (path) => {
  if (fs.existsSync(path)) {
    //borrar la img anterior
    fs.unlinkSync(path);
  }
};

const actualizarImagen = async (tipo, id, path, nombreArchivo) => {
  let pathViejo = "";

  switch (tipo) {
    case "noticias":
      const noticias = await Noticias.findById(id);
      if (!noticias) {
        console.log("no se encontro nota con ese id");
        return false;
      }
      
      pathViejo = `./uploads/noticias/${noticias.imagen}`;

      borrarImagen(pathViejo);

      noticias.imagen = nombreArchivo;
      await noticias.save();
      return true;

      break;
  }
};

module.exports = {
  actualizarImagen,
};
