const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const {MONGOURI} = require('./keys')

const profileRoutes = require('./routes/profileDetails')

require('./models/project')

app.use(express.json())
app.use(require('./routes/project'))

app.use('/profile',profileRoutes)
app.use('/uploads',express.static('../Student/uploads'))

mongoose.connect(MONGOURI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected', ()=>{
    console.log("connected to Mongo")
})
mongoose.connection.on('error', (err)=>{
    console.log("err connecting : ", err)
})

app.listen(PORT,()=>{
    console.log("server is running on ",PORT)
})
