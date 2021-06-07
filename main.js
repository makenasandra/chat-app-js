const express = require('express')
const bodyParser = require('body-parser')
const app = express() 
const http = require('http').Server(app)
const  io = require('socket.io')(http)
const mongoose =  require("mongoose")
let dbURL = require('./config.js');



app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

mongoose.Promise = Promise


var Message = mongoose.model('Message', {
    name: String,
    message: String
})

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) =>{
        res.send(messages)
    })
})

app.get('/messages/:user', (req, res) => {
    var user = req.params.user
    Message.find({name: user}, (err, messages) => {
        res.send(messages)
    })
})

app.post('/messages', async (req, res) => {

    try {
        //throw 'some error'
        var message = new Message(req.body)

        var savedMessage = await message.save()

        console.log('saved')

        var censored = await Message.findOne({ message: 'badword' })

        if (censored)
            await Message.remove({ _id: censored.id })
        else
            io.emit('message', req.body)

        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
        return console.error(error)
    }
})

io.on('connection', (socket) => {
    console.log('a user connected')
})

mongoose.connect(dbURL, (err) => {
    console.log('mongo db connection', err)
})

var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})
