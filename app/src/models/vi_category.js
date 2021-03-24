'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vi_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  vi_category.init({
    category_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    category_name: DataTypes.STRING,
    image_icon_path: DataTypes.STRING,
    category_details: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    created_by: DataTypes.INTEGER,
    modified_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'vi_category',
  });
  return vi_category;
};