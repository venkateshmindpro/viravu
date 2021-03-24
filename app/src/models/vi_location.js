'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vi_location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  vi_location.init({
    location_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    location_name: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longtitude: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    created_by: DataTypes.INTEGER,
    modified_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'vi_location',
  });
  return vi_location;
};