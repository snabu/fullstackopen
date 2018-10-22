if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

let port = process.env.PORT
let mongoUrl = 'mongodb://' + process.env.FULLSTACKOPEN_MLAB_USER + ':' + process.env.FULLSTACKOPEN_MLAB_PWD + '@' + process.env.PRODUCTION_DB_ADDRESS


if (process.env.NODE_ENV === 'test') {
    port = process.env.TEST_PORT
    mongoUrl = 'mongodb://' + process.env.FULLSTACKOPEN_MLAB_TESTUSER + ':' + process.env.FULLSTACKOPEN_MLAB_TEST_PWD + '@' + process.env.TEST_DB_ADDRESS
}


if (process.env.NODE_ENV === 'development') {
    port = process.env.DEV_PORT
    mongoUrl = 'mongodb://' + process.env.FULLSTACKOPEN_MLAB_DEVUSER + ':' + process.env.FULLSTACKOPEN_MLAB_DEV_PWD + '@' + process.env.DEV_DB_ADDRESS
}

console.log(mongoUrl)

module.exports = {
    mongoUrl,
    port
}