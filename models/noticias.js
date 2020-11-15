const { Schema, model } = require("mongoose");

const NoticiasSchema = Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    imagen: {
      type: String,
      required: true,
    },
    subtitulo: {
      type: String,
      required: true,
    },
    texto: {
      type: String,
      required: true,
    },
  },
  { collection: "noticias" }
);

//para cambiar algun parametro, config global (ej: _id por id)
NoticiasSchema.method("toJSON", function () {
  const { __v, ...Object } = this.toObject();

  return Object;
});

module.exports = model("Noticias", NoticiasSchema);