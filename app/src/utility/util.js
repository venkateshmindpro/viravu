"use strict";
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const ENV_CONFIG = require('../../config.json')[env];
const mailTemplate = require('./mail_template');
const util = {
     generateOTP:() =>{
        let randomNumber = Math.floor(100000 + Math.random() * 900000);
        randomNumber = randomNumber.toString();
        randomNumber = randomNumber.substring(0, 6);
        return parseInt(randomNumber);
    },
    emailTrigger:(detail) => {
        try {
            return new Promise((resolve, reject) => {
                const template = mailTemplate[detail.templateName](detail);
                
                const transporter = nodemailer.createTransport({
                    host: ENV_CONFIG.SMTP_HOST,
                    service: ENV_CONFIG.SMTP_SERVICE,
                    secureConnection: false,
                    port: ENV_CONFIG.SMTP_PORT,
                    auth: {
                        user: ENV_CONFIG.SMTP_MAIL,
                        pass: ENV_CONFIG.SMTP_PWD
                    },
                    tls: { rejectUnauthorized: false },
                    debug:true,
                    connectionTimeout: 5 * 60 * 1000,
                });
               // console.log('transport',transporter)

                const rand = randomstring.generate()
                let mailarr = null;

                if (_.isArray(detail.mailIdList)) {
                    mailarr = detail.mailIdList.join();
                } else {
                    mailarr = detail.mailIdList;
                }

                const mailOptions = {
                    from: ENV_CONFIG.SMTP_MAIL,
                    to: mailarr,
                    subject: detail.subject,
                    html: template,
                    dsn: {
                        id: rand,
                        return: 'HEADERS',
                        notify: ['SUCCESS','FAILURE', 'DELAY'],
                        recipient: 'Venkatesh.Marappan@acinfotech.com'
                    }
                };
               // console.log("mail",mailOptions)

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        reject(error);
                        transporter.close();
                    } else {
                        resolve(info);
                        transporter.close();
                    }
                });
            });
        } catch (err) {
            console.log(err);
        }
    }

}
module.exports =  util 