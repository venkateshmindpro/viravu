'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vi_service_providers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  vi_service_providers.init({
    service_type: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    service_location_id: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN,
    created_by: DataTypes.INTEGER,
    modified_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'vi_service_providers',
  });
  return vi_service_providers;
};