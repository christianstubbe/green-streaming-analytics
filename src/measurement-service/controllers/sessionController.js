const { response } = require('express')
const sessionService = require('../services/sessionService')

/**
 * @param {Request} req 
 * @param {Response} res
 * @returns {Response}
 * @description Controller method for returning all sessions.
 */
const getSessions = (req, res) => {

    sessionService.getAllSessions()
        .then(results => {
                return res.status(200).json(results);
            }
        )
        .catch(error => {
                return res.status(500);
            }
        )

}

/**
 * @param {Request} req 
 * @param {Response} res
 * @returns {Response}
 * @description Controller method for adding a new session.
 */
const postSession = (req, res) => {

    sessionService.createSession(req.body)
        .then(result => {
                return res.status(201).send(`Session created with ID: ${result}`)
            }
        )
        .catch(error => {
                return res.status(500)
            }
        )

}

/**
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Response}
 * @description Controller method for terminating a session.
 */
const terminateSession = (req, res) => {

    id = req.query.id;

    sessionService.terminateSession(id)
        .then(result => {
                return res.status(200).send(`Session terminated with ID: ${result}`)
            }
        )
        .catch(error => {
                return res.status(500)
            }
        )

}

module.exports = {
    getSessions,
    postSession,
    terminateSession
}