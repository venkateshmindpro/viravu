const {HashtagController} = require('../controller')
const HashtagesRoutes = (app) => {
    app.post('/hashtag', (req, res, next) =>  HashtagController.createHashtags(req,res,next));
    app.get('/hashtag', (req, res, next) =>  HashtagController.getHashTags(req,res,next));
}
module.exports = HashtagesRoutes;