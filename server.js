const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

// Express App Config

app.use(cookieParser())
app.use(bodyParser.json())
app.use(session({
    secret: 'rent&drive secret',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));

} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3030', 'http://localhost:3030','http://localhost:8081'],
        credentials: true
    }
    app.use(cors(corsOptions))
}


const carRoutes = require('./api/car/car.routes')
// const userRoutes = require('./api/user/user.routes')

// routes
app.use('/api/car', carRoutes)
// app.use('/api/user',userRoutes)






app.get('/**', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); 
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030;
http.listen(port, () => {
    logger.info('Server is running on port: '+ port)
})