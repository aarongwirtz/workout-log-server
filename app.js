require('dotenv').config();

/* EXPRESS SETUP */
let express = require('express');
let app = express();

/* SEQUELIZE SETUP */
let sequelize = require('./db');

/* CONTROLLER ACCESS */
let workout = require('./controllers/workoutcontroller')
let user = require('./controllers/usercontroller')

/* SEQUELIZE SYNC TO DATABASE */
sequelize.sync();
//DROP TABLE sequelize.sync({force: true})

/* MIDDLEWARE */
app.use(require('./middleware/header'));

/* EXPRESS JSON */
app.use(express.json());

/* USER CONTROLLER ENDPOINT SETUP */
app.use('/user', user);

/* WORKOUT LOG ENDPOINT SETUP */
app.use('/workout', workout)

/* SERVER SETUP */
app.listen(3000, function () {
    console.log('App is listening on port 3000.');
})