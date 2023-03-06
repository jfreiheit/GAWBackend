const passport = require('passport')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoutes = require('../backend/routes/user.routes.js');
const coacheeRoutes = require('../backend/routes/coachee.routes.js');
const formulareRoutes = require('../backend/routes/formulare.routes.js');
const userAndCoacheeRoutes = require('../backend/routes/userAndCoachee.routes');
const termineRoutes = require('../backend/routes/termine.routes')
const fileRoutes = require('./routes/file.routes')
const keys = require('./config/keys')
const app = express()
const compression = require('compression');
const helmet = require('helmet');

mongoose.connect(keys.mongoURI)
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use(require('cors')())
app.use(compression()); //Compress all routes
app.use(helmet());
app.use('/uploads', express.static('uploads')) //1.uploads - client zugriff, 2.uploads -
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', userRoutes) //api ist der token
app.use('/api/auth', termineRoutes)
app.use('/api/auth', formulareRoutes)
app.use('/api/auth', coacheeRoutes)
app.use('/api/auth', userAndCoacheeRoutes)
app.use('/api/auth', fileRoutes)

module.exports = app
