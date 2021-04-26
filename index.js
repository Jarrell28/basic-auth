'use strict';

//3rd party libs
const mongoose = require('mongoose');

//interal files
const server = require('./src/server.js');


mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        server.listen(3000, () => console.log('server up'));
    })
    .catch(e => console.error('Could not start server', e.message));
