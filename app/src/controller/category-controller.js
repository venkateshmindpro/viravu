const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const categoryModel = require('../models').vi_category
const config = require('../../config.json');
const categoryController = {
    createCategory: (req, res, next) => {
        let response = {}; 
        req.checkBody('category_name', 'category name is required').notEmpty();
        let error = req.validationErrors() ? req.validationErrors().map((err) => `message : ${err.msg}`) : req.validationErrors();
        if (error && error.length > 0) {
            return res.status(412).send(error);
        } else {
            let body = req.body
            categoryModel.findOne({
                where: {
                    category_name: body.category_name,
                    is_active: true
                }
            }).then(isCategory => {
                if (isCategory) {
                    response.success = false;
                    response.message = `This category name already exist`;
                    return res.status(401).send(response);
                } else {
                    body.created_by = req.id
                    categoryModel.create(body).then(createdData => {
                        response.success = true;
                        response.message = `category created successful.`;
                        response.data = createdData;
                        return res.status(200).send(response);
                    })
                }
            }).catch(next)
        }
    },
    getCategories:(req, res, next) => {
        let response = {};
        const limit = req.query.limit || config.DEFAULT_RECORD_LIMIT;
        const offset = req.query.offset * limit || 0;
        const sort = req.query.sort;
        const search = req.query.search || '' ;
        console.log(search)
        return categoryModel.findAndCountAll({
            where: {
                is_active:true,
                category_name: {
                    [Op.iLike]: `%${search}%`
                }
            },
            offset: offset,
            limit: limit,
            order: [['category_id']]
        }).then(getData => {
            response.success = true;
            response.data = getData;
            response.TotalRowCount = getData.count;
            return res.status(200).json(response)
        }).catch(next)
    },

    updateCategory: (req, res, next) => {
        let response = {}; 
        req.checkBody('category_name', 'category name is required').notEmpty();
        console.log(req.params.id)
        let error = req.validationErrors() ? req.validationErrors().map((err) => `message : ${err.msg}`) : req.validationErrors();
        if (error && error.length > 0) {
            return res.status(412).send(error);
        } else {
            let body = req.body
            categoryModel.findOne({
                where: {
                    category_name: body.category_name,
                    is_active: true,
                    category_id: {
                        [Op.ne]:req.params.id
                    }
                }
            }).then(isCategory => {
                if (isCategory) {
                    response.success = false;
                    response.message = `This category name already exist`;
                    return res.status(406).send(response);
                }else {
                    body.created_by = req.id
                    categoryModel.update(body, {
                        where: {
                            category_id: req.params.id
                        }
                        
                    }).then(isupdated => {
                            response.success = true;                        
                            response.message = `category updated successful.`;
                            response.data = isupdated;
                            return res.status(200).send(response);
                        }).catch(next);
                }
            }).catch(next)
        }

    },
    deleteCategory: (req, res, next) => {
        let response = {}; 
        let requestbody={
            "is_active":false
        }
        categoryModel.findByPk(req.params.id)
        .then(categoryModel => {
            if (!categoryModel) {
                    return res.status(400).send({
                    message: 'Category Not Found',
                 });
            }
            return  categoryModel.update(requestbody, {
                where: {
                    category_id : req.params.id
                }
            }).then(updatedData => {
                    response.success = true;                        
                    response.message = `Category deleted successful.`;
                  //  response.data = updatedData;
                    return res.status(200).send(response);
                })          
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
  
    }

}
module.exports = categoryController