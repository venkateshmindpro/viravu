'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vi_interest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      vi_interest.hasMany(models.vi_hashtags, {foreignKey: 'hashtag_id',sourceKey: 'hashtag_ids', as: 'hashtag', });
      vi_interest.hasMany(models.vi_category, {foreignKey: 'category_id',sourceKey: 'category_ids', as: 'categories', });
      vi_interest.hasMany(models.vi_merchandises, {foreignKey: 'merchandise_id',sourceKey: 'merchandise_ids', as: 'merchandise', });
    }
  };
  vi_interest.init({
    interest_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id:DataTypes.INTEGER,
    interest_title: DataTypes.STRING,
    location_name: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longtitude: DataTypes.STRING,
    category_ids: DataTypes.ARRAY(DataTypes.INTEGER),
    location_ids: DataTypes.ARRAY(DataTypes.INTEGER),
    upvote_threshold: DataTypes.STRING,
    current_upvotes: DataTypes.STRING,
    is_upvoted: DataTypes.BOOLEAN,
    theme_id :DataTypes.INTEGER,
    description: DataTypes.STRING,
    can_buy_tickets: DataTypes.STRING,
    can_pre_order: DataTypes.STRING,
    is_crowdsourced_interest: DataTypes.BOOLEAN,
    is_public_interest: DataTypes.BOOLEAN,
    location_type: DataTypes.STRING,
    is_location_crowdsourced:DataTypes.BOOLEAN,
    interest_image_path: DataTypes.STRING,
    hashtag_ids:DataTypes.ARRAY(DataTypes.INTEGER),
    service_provider_ids:DataTypes.ARRAY(DataTypes.INTEGER),
    merchandise_ids:DataTypes.ARRAY(DataTypes.INTEGER),
    is_active: DataTypes.BOOLEAN,
    is_publish:DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'vi_interest',
  });
  return vi_interest;
};