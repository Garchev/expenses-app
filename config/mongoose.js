const mongoose = require('mongoose');

const { DB_Uri } = require('./config');

module.exports = () => {
    mongoose.connect(DB_Uri, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', console.log.bind(console, 'Db Connected!'));
}