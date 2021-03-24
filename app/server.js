const app = require('express')()
const validator = require("express-validator");
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
//const app = express();
const routes = require('./src/routes')
const db_connections = require('./src/config/db_connections')
// port Initilized 
// const env = process.env.NODE_ENV || "development";
// const config = require("./config.json")[env];
const port = process.env.PORT || 7000;
const options = {

}
appconfig = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors())
    app.use(validator());
    // if (env !== "production") {
    //     app.use(morgan("dev"));
    // }
}
appExecute = () => {
    appconfig()
    routes(app)
    db_connections.initilize()

}
app.listen(port, () => {
    appExecute()
    //console.log("env", env);
    console.log(`App listening on port ${port}!`)
})
// if (env !== 'developement') {
//     https.createServer(options, appExecute()).listen(port);
// } else {
//     http.createServer(appExecute()).listen(port)
// }
