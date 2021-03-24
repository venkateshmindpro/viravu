const {CategoryController} = require('../controller')
const CategoryRoutes = (app) => {
    app.post('/category', (req, res, next) =>  CategoryController.createCategory(req,res,next));
    app.get('/category', (req, res, next) =>  CategoryController.getCategories(req,res,next));
    app.put('/category/:id',(req, res, next) => CategoryController.updateCategory(req,res,next));
    app.delete('/category/:id',(req, res, next) => CategoryController.deleteCategory(req,res,next));

}
module.exports = CategoryRoutes;

