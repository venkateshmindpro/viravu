const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const merchandisesModel = require('../models').vi_merchandises
const config = require('../../config.json');
const merchandisesController = {
    createMerchandises: (req, res, next) => {
        let response = {}; 
        req.checkBody('merchandise_name', 'merchandise name is required').notEmpty();
        req.checkBody('merchandise_type', 'merchandise type is required').notEmpty();
        let error = req.validationErrors() ? req.validationErrors().map((err) => `message : ${err.msg}`) : req.validationErrors();
        if (error && error.length > 0) {
            return res.status(412).send(error);
        } else {
            let body = req.body
            merchandisesModel.findOne({
                where: {
                    merchandise_name : body.merchandise_name,
                    is_active: true
                }
            }).then(ismerchandise => {
                if (ismerchandise) {
                    response.success = false;
                    response.message = `This merchandise name already exist`;
                    return res.status(401).send(response);
                } else {
                    body.created_by = req.id
                    merchandisesModel.create(body).then(createdData => {
                        response.success = true;
                        response.message = `merchandises created successful.`;
                        response.data = createdData;
                        return res.status(200).send(response);
                    })
                }
            }).catch(next)
        }
    },
    getMerchandises:(req, res, next) => {
        let response = {};
        const limit = req.query.limit || config.DEFAULT_RECORD_LIMIT;
        const offset = req.query.offset * limit || 0;
        const sort = req.query.sort;
        const search = req.query.search || '' ;
        console.log(search)
        return merchandisesModel.findAndCountAll({
            where: {
                is_active:true,
                merchandise_name: {
                    [Op.iLike]: `%${search}%`
                }
            },
            offset: offset,
            limit: limit,
            order: [['merchandise_id']]
        }).then(getData => {
            response.success = true;
            response.data = getData;
            response.TotalRowCount = getData.count;
            return res.status(200).json(response)
        }).catch(next)
    },

    updateMerchandises: (req, res, next) => {
        let response = {}; 
        req.checkBody('merchandise_name', 'merchandise name is required').notEmpty();
        req.checkBody('merchandise_type', 'merchandise type is required').notEmpty();
        let error = req.validationErrors() ? req.validationErrors().map((err) => `message : ${err.msg}`) : req.validationErrors();
        if (error && error.length > 0) {
            return res.status(412).send(error);
        } else {
            let body = req.body
            merchandisesModel.findOne({
                where: {
                    merchandise_name: body.merchandise_name,
                    is_active: true,
                    merchandise_id: {
                        [Op.ne]:req.params.id
                    }
                }
            }).then(ismerchandise => {
                if (ismerchandise) {
                    response.success = false;
                    response.message = `This merchandise name already exist`;
                    return res.status(406).send(response);
                }else {
                    body.created_by = req.id
                    merchandisesModel.update(body,{
                        where: {
                            merchandise_id: req.params.id
                        }
                    }).then(updatedData => {
                            response.success = true;                        
                            response.message = `merchandise updated successful.`;
                            response.data = updatedData;
                            return res.status(200).send(response);
                        }).catch(next);
                }
            }).catch(next)
        }

    },

    deleteMerchandises: (req, res, next) => {
        let response = {}; 
        let requestbody={
            "is_active":false
        }
        merchandisesModel.findByPk(req.params.id)
        .then(merchandisesModel => {
            if (!merchandisesModel) {
                    return res.status(400).send({
                    message: 'merchandises Not Found',
                 });
            }
            return  merchandisesModel.update(requestbody, {
                where: {
                    merchandise_id: req.params.id
                }
            }).then(updatedData => {
                    response.success = true;                        
                    response.message = `merchandise deleted successful.`;
                   return res.status(200).send(response);
                })          
            .catch((error) => res.status(400).send(error));
        }) .catch((error) => res.status(400).send(error));
  
    }

}
module.exports = merchandisesController