const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const userModel = require('../models').vi_user
const {util} = require('../utility')
const userController =  {
    userSignUp :(req, res, next) => {
        let response = {};
        // req.checkBody('email', 'hashtag_name is required').notEmpty();
        let error = req.validationErrors() ? req.validationErrors().map((err) => `message : ${err.msg}`) : req.validationErrors();
        if (error && error.length > 0) {
            return res.status(412).send(error);
        } else {
            let body = req.body
            body.email_id =  body.email_id ? body.email_id : ''
            body.first_name = body.first_name ||  body.email_id ? body.email_id.split('@')[0] : '';
            body.created_by = req.id || 0;
            body.user_mobile_no = body.user_mobile_no || ''
            body.last_name = body.last_name || ''
            let whereQuery = {
                    is_active: true,
                    [Op.or]: [{
                        user_mobile_no: body.user_mobile_no,
                    },
                    {
                        email_id: body.email_id
                    }
                    ]
            }
            return userModel.findOne({
                where:whereQuery,
                logging:true
            }).then(user => {
                if(user){
                    if (user.email_id && (user.email_id === email_id)) {
                        response.success = false;
                        response.message = `This email address already exist`;
                        return res.status(406).send(response);
                    }
                    if (user.user_mobile_no && (user.user_mobile_no === body.user_mobile_no)) {
                        response.success = false;
                        response.message = `This mobile number already exist`;
                        return res.status(406).send(response);
                    }
                } else {
                    body.user_otp =  util.generateOTP();
                    userModel.create(body).then(createdUser => {
                        response.success = true;
                        response.userData = createdUser;
                        response.message = `Account has been created successfully`;
                        return res.status(406).send(response);
                        // if(createdUser.email_id){
                        //     const mailParams = Object.assign({}, {
                        //         userName: createdUser.first_name + " " + createdUser.last_name,
                        //         mailIdList: [createdUser.email_id],
                        //         subject: `Viravu Verification PIN: ${createdUser.verify_otp}`,
                        //         templateName: 'veritficationTemp',
                        //         OTP: createdUser.user_otp,
                        //     });
                        // }
                    })
                }
            }).catch(next)
        }
    },
    verifiedOtp: (req,res,next) => {
        let registrationResponse = {};
        req.checkBody('verify_otp', 'Please enter valid OTP.').notEmpty();
        let error = req.validationErrors() ? req.validationErrors().map((err) => `message : ${err.msg}`) : req.validationErrors();
        if (error && error.length > 0) {
            return res.status(412).send(error);
        } else {
            return userModel.findOne({
                where: {
                    verify_otp: req.body.verify_otp,
                    is_active: true,
                    acc_active: true
                }
            }).then(findedUser => {
                if (!findedUser) res.status(412).json({ message: 'You have entered wrong OTP. Please enter valid OTP' });
                return findedUser.update({
                    is_verified: true
                }).then(updatedUser => {
                    return utility.createToken(updatedUser).then(keyToken => {
                        registrationResponse.success = true;
                        registrationResponse.token = utility.dataEncryption(keyToken.token);
                        registrationResponse.user_id = keyToken.company_user_id;
                        registrationResponse.user_role = keyToken.user_role;
                        registrationResponse.master_user_id = findedUser.user_id;
                        res.status(200).json(registrationResponse)
                    })
                }).catch(next);
            }).catch(next);
        }
    }
}
module.exports = userController