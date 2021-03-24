const models = require("../models");
const env = process.env.NODE_ENV || "development";
// const config = require("../../config.json")[env];

const initilize = () => models.sequelize
    .authenticate().then(() => {
        console.log(`Database connection established successfully.`)
    }).catch(err => {
        console.error(`Unable to connect the database : ${err}`);
});

module.exports = {initilize}