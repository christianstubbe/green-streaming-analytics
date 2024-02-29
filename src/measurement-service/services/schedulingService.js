const schedule = require('node-schedule');
const sessionService = require('../services/sessionService');

const everyMinute = new schedule.RecurrenceRule();
everyMinute.minute = new schedule.Range(0, 59, 1);

const everyFiveSeconds = new schedule.RecurrenceRule();
everyFiveSeconds.second = new schedule.Range(0, 59, 5);

// Terminates all outdated sessions every minute
const terminateAllOutdatedSessionsJob = schedule.scheduleJob(everyMinute, function() {
    sessionService.terminateAllOutdatedSessions()
});

// Fetches NETIO data for all active sessions every 5 seconds
const gatherNetioDataJob = schedule.scheduleJob(everyFiveSeconds, function() {
    sessionService.gatherConsumptionDataForActiveSessions()
});