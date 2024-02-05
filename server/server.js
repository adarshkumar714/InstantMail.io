const express = require('express')
const multer = require('multer')
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

app.use((req, res)=>{
    console.log(req.ip);
    res.send('home');
})

app.post('/', (req, res)=>{
    let data = req.body;
    sendMail(data);
    res.send('<h1>mail sent</h1>');
})

// file share
// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname);
    }
});

// Init upload
const upload = multer({ storage: storage });

app.use(express.static('.')); // Serve static files from root directory

app.use((req, res, next)=>{
    console.log('Uploading file...');
    next();
})

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully');
});

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
