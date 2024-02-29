const { Session } = require('../models')
const { getLatestCMCDEntryBySessionId } = require('./cmcdService')
const { getNetioData } = require('./netioService')
const config = require('../config/config')

/**
 * @description Fetch all sessions from the database
 * @returns {Promise} A promise that resolves to an array of all sessions
 */
function getAllSessions() {

    return new Promise((resolve, reject) => {
        Session.findAll()
            .then((sessions) => {
                resolve(sessions)
            })
            .catch((err) => {
                console.error(err)
                reject(err)
            })
    })

}

/**
 * @description Check if a session with the given session ID exists
 * @param {any} reqBody 
 * @returns {Promise} A promise that resolves to a boolean indicating whether the session exists
 */
async function doesSessionExist(reqBody) {

    const numberOfEntries = await Session.count({
        where: {
            sessionId: reqBody.sid
        }
    })

    console.info(`${numberOfEntries} sessions found for this sid.`)

    return numberOfEntries > 0 ? true : false

}

/**
 * @description Create a new session in the database
 * @param {any} reqBody 
 * @returns {Promise} A promise that resolves to the ID of the newly created session
 */
function createSession(reqBody) {
    
    return new Promise((resolve, reject) => {
        Session.create({
            id: reqBody.sessionID,
            deviceSerialNumber: reqBody.serialNumber,
            deviceIP: reqBody.IPaddress,
            deviceUsername: reqBody.username,
            devicePassword: reqBody.password
        }).then((newSession) => {
            resolve(newSession.id)
        })
        .catch((err) => {
            if (err) {
                console.error(err)
                reject(err)
            }
        })
    })
}

/**
 * @description Terminates all outdated sessions whose latest CMCD entry is older than the configured time
 */
async function terminateAllOutdatedSessions() {
    
        const activeSessions = await Session.findAll({
            where: {
                terminatedOn: null
            }
        })

        for (const session of activeSessions) {
            latestCmcdEntries = await getLatestCMCDEntryBySessionId(session.id)
            if (latestCmcdEntries.length > 0) {
                if (Date.now() - latestCmcdEntries[0].createdAt > config.development.terminateSessionAfter) {
                    console.info('Inactive session found. Terminating session with ID: ' + session.id)
                    terminateSession(session.id)
                }
            }
        }
    
    
}

/**
 * @description Fetch NETIO data for all active sessions
 */
async function gatherConsumptionDataForActiveSessions() {
    
        const activeSessions = await Session.findAll({
            where: {
                terminatedOn: null
            }
        })
    
        for (const session of activeSessions) {
            var sessionId = session.id
            var deviceIP = session.deviceIP
            var deviceUsername = session.deviceUsername ? session.deviceUsername : null
            var devicePassword = session.devicePassword ? session.devicePassword : null

            getNetioData(sessionId, deviceIP, deviceUsername, devicePassword)
        }
        
}

/**
 * @description Terminate the session with the given ID
 * @param {string} id
 * @returns {Promise} A promise that resolves to the ID of the terminated session
 */
function terminateSession(id) {

    return new Promise((resolve, reject) => {
        Session.update(
            { terminatedOn: Date.now() },
            { where: {id: id } }
        ).then(() => {
            resolve(id)
        })
        .catch((err) => {
            if (err) {
                console.error(err)
                reject(err)
            }
        })
    })

}

/**
 * @description Reactivate the session with the given ID
 * @param {string} id 
 * @returns {Promise} A promise that resolves to the ID of the reactivated session
 */
function reactivateSession(id) {
    
    return new Promise((resolve, reject) => {
        Session.update(
            { terminatedOn: null },
            { where: {id: id } }
        ).then(() => {
            resolve(id)
        })
        .catch((err) => {
            if (err) {
                console.error(err)
                reject(err)
            }
        })
    })
    
}

/**
 * @description Check if the session with the given ID is inactive
 * @param {string} id 
 * @returns {Promise} A promise that resolves to a boolean indicating whether the session is inactive
 */
function isSessionInactive(id) {
    
    return new Promise((resolve, reject) => {
        Session.findByPk(id)
            .then((session) => {
                if (session !== null && session.terminatedOn !== null) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
            .catch((err) => {
                console.error(err)
                reject(err)
            })
    })
    
}

module.exports = {
    getAllSessions,
    createSession,
    terminateSession,
    terminateAllOutdatedSessions,
    doesSessionExist,
    reactivateSession,
    isSessionInactive,
    gatherConsumptionDataForActiveSessions
}