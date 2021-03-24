const {UserController} = require('../controller')
const UserRoutes = (app) => {
    app.post('/user-signup', (req, res, next) => UserController.userSignUp(req,res,next) );
}
module.exports = UserRoutes;