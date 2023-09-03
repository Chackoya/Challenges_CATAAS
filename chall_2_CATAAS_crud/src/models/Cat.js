// src/models/Cat.js
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cat extends Model {}
  
  Cat.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      metadata: {
        type: DataTypes.JSON,
        allowNull: true
      },
      imageData: {
        type: DataTypes.BLOB('long'),
        allowNull: true
      },
      mimeType: { // not mandatory, but i am assuming we're using same type of img as CATAAS , jpeg.
        type: DataTypes.STRING,
        allowNull: true
      },
    },
    {
      sequelize,
      modelName: 'Cat',
      timestamps: true,
    }
  );
  return Cat;
};
