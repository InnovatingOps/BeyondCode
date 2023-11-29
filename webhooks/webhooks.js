const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')

const secret = 'abcd!'
const port = 8000
const app = express()

app.use(bodyParser.urlencoded({extended: false}))

app.post('/webhooks/on_message_sent', (req, res) => {
    const signature = crypto.createHmac('sha256', secret)
        .update(req.body.message).digest('hex')
    const remoteSignature = req.headers['x-signature']
    if (remoteSignature == null || remoteSignature !== signature) {
        res.status(403).send("UNAUTHORIZED")
        return
    }
    console.log(req.body.message)
    res.send('OK')
})

app.listen(port, () => {
    console.log(`Running webhooks at http://localhost:${port}`)
})