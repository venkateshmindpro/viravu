const {MerchandisesController} = require('../controller')
const MerchandisesRoutes = (app) => {
    app.post('/merchandises', (req, res, next) =>  MerchandisesController.createMerchandises(req,res,next));
    app.get('/merchandises', (req, res, next) =>  MerchandisesController.getMerchandises(req,res,next));
    app.put('/merchandises/:id',(req, res, next) => MerchandisesController.updateMerchandises(req,res,next));
    app.delete('/merchandises/:id',(req, res, next) => MerchandisesController.deleteMerchandises(req,res,next));
}
module.exports = MerchandisesRoutes;