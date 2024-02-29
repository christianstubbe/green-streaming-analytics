const { Cmcd } = require('../models')

/**
 * @returns {Promise} - A promise that resolves to an array of all CMCD entries
 */
function getAllCMCDEntries() {

    return new Promise((resolve, reject) => {
        Cmcd.findAll()
            .then((cmcds) => {
                resolve(cmcds)
            })
            .catch((err) => {
                console.error(err)
                reject(err)
            })
    })

}

/**
 * @param {string} sid 
 * @returns {Promise} A promise that resolves to an array of all CMCD entries with the given session ID
 */
function getCMCDEntriesBySessionId(sid) {
    
    return new Promise((resolve, reject) => {
        Cmcd.findAll({
            where: {
                sid: sid
            }
        })
            .then((cmcds) => {
                resolve(cmcds)
            })
            .catch((err) => {
                console.error(err)
                reject(err)
            })
    })
    
}

/**
 * @param {string} sid 
 * @returns {Promise} A promise that resolves to an array of all CMCD entries with the given session ID
 */
async function getLatestCMCDEntryBySessionId(sid) {
    return new Promise((resolve, reject) => {
        Cmcd.findAll({
            where: {
                sid: sid
            },
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 1
        })
            .then((cmcds) => {
                resolve(cmcds)
            })
            .catch((err) => {
                console.error(err)
                reject(err)
            })
    })
}

/**
 * @param reqBody 
 * @returns {Promise} A promise that resolves to the ID of the new CMCD entry
 */
function createCMCDEntry(reqBody) {
    
    return new Promise((resolve, reject) => {
        Cmcd.create({
            sid: reqBody.sid,
            client_id: reqBody.client_id,
            type: reqBody.type,
            br: reqBody.br,
            cid: reqBody.cid,
            bl: reqBody.bl,
            bs: reqBody.bs,
            d: reqBody.d,
            dl: reqBody.dl,
            mtp: reqBody.mtp,
            nor: reqBody.nor,
            nrr: reqBody.nrr,
            ot: reqBody.ot,
            pr: reqBody.pr,
            rtp: reqBody.rtp,
            sf: reqBody.sf,
            su: reqBody.su,
            tb: reqBody.tb,
            v: reqBody.v,
        }).then((newCmcdEntry) => {
            resolve(newCmcdEntry.id)
        })
        .catch((err) => {
            if (err) {
                console.error(err)
                reject(err)
            }
        })
    })

}

module.exports = {
    getAllCMCDEntries,
    createCMCDEntry,
    getCMCDEntriesBySessionId,
    getLatestCMCDEntryBySessionId
}