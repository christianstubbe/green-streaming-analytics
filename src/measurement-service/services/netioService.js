const request = require("request");
const { Netio } = require("../models");

/**
 * @description Collect energy consumption data from the specified Netio device
 * @param {string} sessionId 
 * @param {string} netioIP 
 * @param {string} username 
 * @param {string} password
 */
function getNetioData(sessionId, netioIP, username, password) {
    // http(s)://username:password@<netioIP>/netio.json

    var netioURL;

    if (username && password != null) {
        netioURL = 'http://' + username + ":" + password + "@" + netioIP + '/netio.json'
    } else {
        netioURL = 'http://' + netioIP + '/netio.json'
    }

    request(netioURL, function (error, response, body) {
            if (error) {
                console.error(error);
            } else {
                createNETIOEntry(sessionId, JSON.parse(body));
            }
        }
    );
    
}

/**
 * @description Create a new NETIO entry in the database
 * @param {string} sessionId 
 * @param {any} netioData 
 * @returns {Promise} A promise that resolves to the ID of the newly created NETIO entry
 */
function createNETIOEntry(sessionId, netioData) {

    return new Promise((resolve, reject) => {
        Netio.create({
            session_id: sessionId,
            //Agent
            model: netioData.Agent.Model,
            device_name: netioData.Agent.DeviceName,
            serial_number: netioData.Agent.SerialNumber,
            //GlobalMeasure
            voltage: netioData.GlobalMeasure.Voltage,
            total_current: netioData.GlobalMeasure.TotalCurrent,
            total_load: netioData.GlobalMeasure.TotalLoad,
            total_energy: netioData.GlobalMeasure.TotalEnergy,
            overall_powerfactor: netioData.GlobalMeasure.OverallPowerFactor,
            frequency: netioData.GlobalMeasure.Frequency,
            phase: netioData.GlobalMeasure.Phase,
        })

        .then((newNetioEntry) => {
            resolve(newNetioEntry.id);
        })

        .catch((err) => {
            if (err) {
                console.log(err);
            reject(err);
            }
        });
    });
}

module.exports = {
  createNETIOEntry,
  getNetioData,
};