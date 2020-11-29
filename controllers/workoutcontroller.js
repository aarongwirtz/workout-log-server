let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const Log = require('../db').import('../models/log')

//Create Log Entry
router.post('/log', validateSession, (req, res) => {
    //res.send('Log POST endpoint is working.')

    const logEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id
    }
    Log.create(logEntry)
    .then(log => res.status(200).json(log))
    .catch(err => res.send(500).json({error: err}))
})

//Get All Individual Log Entries
router.get('/log', (req, res) => {
    //res.send('Log GET endpoint is working.')

    Log.findAll()
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
})

//Get Individual User Log Entries by ID
router.get('/log/:id', validateSession, (req, res) => {
    //res.send('Log ID GET endpoint is working.')

    let userid = req.user.id
    Log.findAll({
        where: {owner_id: userid}
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
})

//Update a log entry
router.put('/log/:id', validateSession, (req, res) => {
    //res.send('Log ID PUT endpoint is working.')

    // const updateLogEntry = {
    //     description: req.body.log.description,
    //     definition: req.body.log.definition,
    //     result: req.body.log.result,
    //     entry: req.body.log.entry,
    // };

    //const query = {where: {id: req.params.entryId, owner: req.user.id}};

    //Log.update(updateLogEntry, query)
    Log.update(req.body, {where: {id: req.params.id}})
        .then((log) => res.status(200).json({log}))
        .catch((err) => res.status(500).json({error: err}));
})

//Delete a log entry
router.delete('/log/:id', function (req, res){
    //res.send('Log ID PUT endpoint is working.')

    //const query = {where: {id: req.params.id, owner: req.user.id}};

    Log.destroy({where: {id: req.params.id}})
    .then((logs) => res.status(200).json({logs}))
    .catch((err) => res.status(500).json({error: err}));
})

module.exports = router