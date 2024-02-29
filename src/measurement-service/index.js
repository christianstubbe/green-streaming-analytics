const express = require('express')
const cors = require('cors')
const app = express()
const schedulingService = require('./services/schedulingService')

app.use(express.json())
app.use(cors())
const cmcdController = require('./controllers/cmcdController')
const sessionController = require('./controllers/sessionController')

const db = require('./models')

app.get('/api/measurements/cmcd/all', cmcdController.getCMCD)
app.post('/api/measurements/cmcd', cmcdController.postCMCD)
app.get('/api/measurements/cmcd/session/:sid', cmcdController.getCMCDbySessionId)

app.get('/api/measurements/session/all', sessionController.getSessions)
app.post('/api/measurements/session', sessionController.postSession)
app.post('/api/measurements/session/terminate', sessionController.terminateSession)

const servicePort = process.env.SERVICE_PORT
db.sequelize.sync().then((req) => {
    app.listen(servicePort, () => console.info('Server running on port ' + servicePort))
});