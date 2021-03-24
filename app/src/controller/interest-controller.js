const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const interestModel = require('../models').vi_interest
const config = require('../../config.json');
const hashtagModel = require('../models').vi_hashtags
const categoryModel = require('../models').vi_category
const merchandisesModel = require('../models').vi_merchandises
const interestController = {
    InterestCreation: async (req, res, next) => {
        let response = {};
        req.checkBody('interest_name', 'interest_name is required').notEmpty();
        let error = req.validationErrors() ? req.validationErrors().map((err) => `message : ${err.msg}`) : req.validationErrors();
        if (error && error.length > 0) {
            return res.status(412).send(error);
        } else {
            let body = req.body
            if (body.interest_id) {
                let updatedCreation = await updatedCreationData(body)
                if (updatedCreation) {
                    if (updatedCreation.is_publish) {
                        response.success = true
                        response.message = `Your Interest is currently being reviewed by our team. You will receive notification once it has been approved.`
                        response.creation = updatedCreation
                        res.status(200).send(response)
                    } else {
                        response.success = true
                        response.message = `Your Interest has been successfully saved.`
                        response.creation = updatedCreation
                        res.status(200).send(response)
                    }
                } else {
                    response.success = false
                    response.message = `No Record Found in Draft Section`
                    res.status(406).send(response)
                }
            }
            else {
                interestModel.create(body).then(createDraft => {
                    if (createDraft.is_publish) {
                        response.success = true
                        response.message = `Your Interest is currently being reviewed by our team. You will receive notification once it has been approved.`
                        response.creation = createDraft
                    } else {
                        response.success = true
                        response.message = `Your Interest has been successfully saved.`
                        response.creation = createDraft
                    }
                    res.status(200).send(response)
                })
            }
        }
    },
    getDraftCreationDetails: (req, res, next) => {
        let response = {};
        req.checkParams('interest_id', 'interest_id is required').notEmpty();
        let error = req.validationErrors() ? req.validationErrors().map((err) => `message : ${err.msg}`) : req.validationErrors();
        if (error && error.length > 0) {
            return res.status(412).send(error);
        } else {
            let interestId = req.params.interest_id
            interestModel.findOne({
                where: {
                    interest_id: interestId,
                    is_active: true,
                    is_publish: false
                },
                include: [{
                    model: hashtagModel,
                    where: {
                        is_active: true
                    },
                    as: "hashtag",
                    require: false
                }],
                include: [{
                    model: categoryModel,
                    where: {
                        is_active: true
                    },
                    as: "categories",
                    require: false
                }],
                include: [{
                    model: merchandisesModel,
                    where: {
                        is_active: true
                    },
                    as: "merchandise",
                    require: false
                }]
            }).then(creation => {
                if (creation) {
                    response.success = true;
                    response.creation = creation;
                    return res.status(200).send(response);
                } else {
                    response.success = false;
                    response.message = `No Record Found in Draft Section`;
                    return res.status(406).send(response);
                }
            })
        }
    }
}

const updatedCreationData = (data) => {
    return new Promise((resolve, reject) => {
        if (data) {
            interestModel.findOne({
                where: {
                    interest_id: data.interest_id,
                    is_active: true,
                    is_publish: false
                }
            }).then(creation => {
                if (creation) {
                    creation.update(data).then(updatedCreation => {
                        resolve(updatedCreation)
                    })
                }
                else {
                    resolve({})
                }
            })
        }
    })
}
module.exports = interestController