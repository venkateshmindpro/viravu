const config = require('../../config.json');
const env = process.env.NODE_ENV || 'development';
const ENV_CONFIG = config[env];

const MailTemplate = {
    veritficationTemp: (details) => {
        let mailId = '';
        if (_.isArray(details.mailIdList)) {
            mailId = details.mailIdList[0];
        } else {
            mailId = details.mailIdList;
        }
        const welcomingTemp = `
            <p style="font: 400 14px / 23px 'Open Sans', sans-serif;color: #222222;padding: 0 8%;">
                Thank you for choosing Viravu!
                <br>
                <br> Email: <b style="color: #1f71b8;">${mailId}</b>
                <br>
                <br> After successful login, please enter the below verification to complete the sign up process.
                <br> Please confirm your email address with the following code: <b style="color: #1f71b8;">${details.OTP}</b>.
            </p>`;
        return this.completeMailContent(details.userName, welcomingTemp);
    },
    completeMailContent: (userName, mailBody = '') => {
        const fullMailContent = `

    <body style=" letter-spacing: 0.45px; background: #ececec; -moz-osx-font-smoothing: grayscale; -webkit-font-smoothing: antialiased; -moz-font-smoothing: antialiased; -o-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; text-size-adjust: 100%; ">
    
        <div style="max-width: 800px;margin: 0 auto;padding: 0;width: 96%; padding-top: 40px; overflow: hidden;">
    
            <div style="position: relative; margin-bottom: 100px; background: #fff; padding-bottom: 60px; top: 60px !important; background: #fff; overflow: hidden; 
                box-shadow: 0px 0px 20px 3px rgba(27, 69, 143, 0.12); ">
                
                <div style="display: flex;justify-content: center;align-items: center;max-height: 120px;overflow: hidden; background: #00488f; 
                background-image: -webkit-linear-gradient(60deg,rgb(13, 38, 105) 0%,rgb(45, 137, 210) 100%); padding: 15px 0px;">
                <img style="margin: 0 auto; height:50px; width:auto" src="${imagePath}">
                </div>
    
                <section style="border-top: solid 1px #f0f7fb;">
                    ${this.welcomeToTemp}    
                    <p style="font: 600 14px / 23px 'Open Sans', sans-serif;color: #222222;padding: 0 8%;">Dear ${userName.trim()},</p>                    
                    ${mailBody}                   
                </section> 
    
            </div>
            ${this.footerTemp('canstring')}
        </div>
    </body>`;


        return fullMailContent;
    }
}

module.exports = MailTemplate