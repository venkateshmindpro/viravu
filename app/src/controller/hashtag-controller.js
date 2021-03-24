const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const hashtagModel = require('../models').vi_hashtags
const config = require('../../config.json');
const hashtagController = {
    createHashtags: (req, res, next) => {
        let response = {};
        req.checkBody('hashtag_name', 'hashtag_name is required').notEmpty();
        let error = req.validationErrors() ? req.validationErrors().map((err) => `message : ${err.msg}`) : req.validationErrors();
        if (error && error.length > 0) {
            return res.status(412).send(error);
        } else {
            let body = req.body
            hashtagModel.findOne({
                where: {
                    hashtag_name: body.hashtag_name,
                    is_active: true
                }
            }).then(isHashtag => {
                if (isHashtag) {
                    response.success = false;
                    response.message = `This hashtag name already exist`;
                    return res.status(401).send(response);
                } else {
                    body.created_by = req.id
                    hashtagModel.create(body).then(createdData => {
                        response.success = true;
                        response.message = `Hashtag created successful.`;
                        response.data = createdData;
                        return res.status(200).send(response);
                    })
                }
            }).catch(next)
        }
    },
    getHashTags:(req, res, next) => {
        let response = {};
        const limit = req.query.limit || config.DEFAULT_RECORD_LIMIT;
        const offset = req.query.offset * limit || 0;
        const sort = req.query.sort;
        const search = req.query.search;
        return hashtagModel.findAndCountAll({
            where: {
                is_active:true
            },
            offset: offset,
            limit: limit,
            order: [['hashtag_id']]
        }).then(getData => {
            response.success = true;
            response.data = getData;
            response.TotalRowCount = getData.count;
            return res.status(200).json(response)
        }).catch(next)
    }
}
module.exports = hashtagController