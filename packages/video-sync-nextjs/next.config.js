require('dotenv').config()

module.exports = {
  env: {
    apiurl: process.env.apiurl,
    apikey: process.env.apikey,
    authdomain: process.env.authdomain,
    databaseurl: process.env.databaseurl,
    projectid: process.env.projectid,
    storagebucket: process.env.storagebucket,
    messagingsenderid: process.env.messagingsenderid,
    appid: process.env.appid,
    measurementid: process.env.measurementid,
    session_secret_current: process.env.session_secret_current,
    session_secret_previous: process.env.session_secret_previous,
  },
}
