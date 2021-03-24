'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vi_interests', {
      interest_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: { type: Sequelize.INTEGER },
      interest_title: { type: Sequelize.STRING },
      location_name: { type: Sequelize.STRING },
      latitude: { type: Sequelize.STRING },
      longtitude: { type: Sequelize.STRING },
      category_ids: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: []
      },
      location_ids: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: []
      },
      upvote_threshold: { type: Sequelize.STRING },
      current_upvotes: { type: Sequelize.STRING },
      is_upvoted: {
        type: Sequelize.BOOLEAN,
      },
      theme_id: Sequelize.INTEGER,
      description: { type: Sequelize.STRING },
      can_buy_tickets: { type: Sequelize.STRING },
      can_pre_order: { type: Sequelize.STRING },
      is_crowdsourced_interest: {
        type: Sequelize.BOOLEAN,
      },
      is_public_interest: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      location_type: { type: Sequelize.STRING },
      is_location_crowdsourced: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      interest_image_path: { type: Sequelize.STRING },
      hashtag_ids: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: []
      },
      service_provider_ids: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: []
      },
      merchandise_ids: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: []
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      is_publish: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdBy: Sequelize.INTEGER,
      updatedBy: Sequelize.INTEGER,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('vi_interests');
  }
};