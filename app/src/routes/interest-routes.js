const {InterestController} = require('../controller')
const InterestRoutes = (app) => {
    app.post('/creation/save/', (req, res, next) =>  InterestController.InterestCreation(req,res,next));
    app.get('/creation/details/:interest_id', (req, res, next) =>  InterestController.getDraftCreationDetails(req,res,next));
}
module.exports = InterestRoutes;