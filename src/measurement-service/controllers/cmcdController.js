const { response } = require('express')
const cmcdService = require('../services/cmcdService')
const sessionService = require('../services/sessionService')
const netioService = require('../services/netioService')

/**
 * @param {Request} req
 * @param {Response} res
 * @returns {Response}
 * @description Controller method for returning all CMCD entries.
 */
const getCMCD = (req, res) => {

    cmcdService.getAllCMCDEntries()
        .then(
            results => {
            return res.status(200).json(results);
            }
        )
        .catch(
            error => {
                return res.status(500);
            }
        )

}

/**
 * @param {Request} req
 * @param {Response} res
 * @returns {Response}
 * @description Controller method for returning all CMCD entries by session ID.
 */
const getCMCDbySessionId = (req, res) => {
    
    cmcdService.getCMCDEntriesBySessionId(req.params.sid)
        .then(
            results => {
                return res.status(200).json(results);
            }
        )
        .catch(
            error => {
                return res.status(500);
            }
        )
    
}

/**
 * @param {Request} req
 * @param {Response} res
 * @returns {Response}
 * @description Controller method for adding a new CMCD entry.
 */
const postCMCD = async (req, res) => {

    if (req.body.sid === undefined) {
        return res.status(400).send('sid is required.')
    }

    // Check if session exists and is inactive, reactivate if necessary
    sessionService.isSessionInactive(req.body.sid)
        .then(
            result => {
                if (result) {
                    sessionService.reactivateSession(req.body.sid)
                        .then(
                            result => {
                                console.info(`Session ${result} reactivated.`)
                            }
                        )
                        .catch(
                            error => {
                                console.error(error)
                            }
                        )
                }
            }
        )
        .catch(
            error => {
                console.warn(error)
            }
        )

    cmcdService.createCMCDEntry(req.body)
        .then(
            result => {
                return res.status(201).send(`CMCD entry added with ID: ${result}`)
            }
        )
        .catch(
            error => {
                console.error(error)
                return res.status(500)
            }
        )

}

module.exports = {
    getCMCD,
    postCMCD,
    getCMCDbySessionId
}