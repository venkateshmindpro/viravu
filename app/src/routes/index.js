'use strict';
const env = process.env.NODE_ENV || 'development';
const config = require('../../config.json')[env];
//Routes File 
const hashtagRoutes =require('./hashtags-routes')
const userRoutes =require('./user-routes')
const interestRoutes = require('./interest-routes')
const categoryRoutes = require('./category-routes')
const merchandisesRoutes = require('./merchandises-routes')
const routes = (app) => {
     //app.use(`/viravu/${config.APP_VERSION}`);
    // app.use((req, res, next) => {
    //     const error = new Error('Not found.');
    //     error.status = 404;
    //     next(error);
    // });
    // app.use((error, req, res, next) => {
    //     console.log(error);
    //     return res.status(error.status || 500).send({ message: error.message });
    // });

    //routes implementations
    hashtagRoutes(app)
    userRoutes(app)
    interestRoutes(app)
    categoryRoutes(app)
    merchandisesRoutes(app)

}
module.exports = routes;