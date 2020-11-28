const { Schema, model } = require("mongoose");

const NoticiasSchema = Schema(
  {
    tipo: {
      type: String,
      requered: true
    },
    titulo: {
      type: String,
      required: true,
    },
    imagen: {
      type: String,
      default: ''
    },
    pieDeFoto:{
      type: String,
      default: ''
    },
    subtitulo: {
      type: String,
      required: true,
    },
    texto: {
      type: String,
      required: true,
    },
    fecha: {
      type: String,
      requered: true
    }
  },
  { collection: "noticias" }
);

//para cambiar algun parametro, config global (ej: _id por id)
NoticiasSchema.method("toJSON", function () {
  const { __v, ...Object } = this.toObject();

  return Object;
});

module.exports = model("Noticias", NoticiasSchema);