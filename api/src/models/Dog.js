const { DataTypes } = require('sequelize');


// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID, // hace una clave para que no coincidan los nombres
      allowNull: false,
      unique: true,
      primaryKey: true, // le indico que el ID es la primary key
      defaultValue: DataTypes.UUIDV4 // es el formato que lo genera
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_min: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_max: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight_min: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight_max: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'https://as.com/diarioas/imagenes/2021/04/09/actualidad/1617950287_044031_1617950441_noticia_normal_recorte1.jpg'
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
   },
   
   {         // para no tener que agregar todos estos datos cuando mando un post
      timestamps: false,
      createdAt: false,
      updatedAt: false  
  });
};
