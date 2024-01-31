const express = require('express')
// const cors = require('cors');
const { sendMail } = require('./mailer')

const app = express()

const dotenv = require('dotenv')
dotenv.config()

// corsOptions = {
//     origin: "http://localhost:3000"
// }

// app.use(cors(corsOptions))
app.use(express.urlencoded())
app.use(express.json())

app.post('/', (req, res)=>{
    let data = req.body;
    sendMail(data);
    res.send('<h1>mail sent</h1>');
})

app.use((req, res)=>{
    res.status(404).send({
        message: '404 url not found'
    })
})

const port = process.env.PORT || 3000
const host = '0.0.0.0'

// running the server
app.listen(port, host, ()=>{
    console.log(`[+] server running on http://${host}:${port}`)
})
