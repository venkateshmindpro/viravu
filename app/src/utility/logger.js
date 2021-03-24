// const winston = require('winston')
// require('winston-daily-rotate-file');

// var path = require('path');
// var fs = require('fs');
// var logDir = '/log'; // directory path you want to set
// // Winston Logger 
// const env = process.env.NODE_ENV || 'development';
// const config = require('../../config.json')[env];

// if (!fs.existsSync(logDir)) {
//   // Create the directory if it does not exist
//   fs.mkdirSync(logDir);
// }
// var transport = new (winston.transports.DailyRotateFile)({
//   filename: path.join(logDir, 'vi-backend-%DATE%.log'),
//   datePattern: 'YYYY-MM-DD',
//   zippedArchive: true,
//   //maxSize: '20m',
//   maxFiles: '14d'
// });


// const logger = winston.createLogger({
//   //level: 'info',
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     //winston.format.prettyPrint()
//     //winston.format.json(),
//     winston.format.colorize(),
//     winston.format.printf(
//       info => `${info.timestamp}  ${info.level} : ${info.message}`
//     )
//   ),

//   //defaultMeta: { service: 'user-service' },
//   transports: [
//     transport
//   ]
// });

// // If we're not in production then log to the `console`  
// if (env === 'development') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.combine(
//       winston.format.colorize(),
//       winston.format.printf(
//         info => `${info.timestamp}  ${info.level} : ${info.message}`
//       )
//     )
//   }));
// }

// module.exports =  logger