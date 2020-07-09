const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const {MONGOURI} = require('./keys')

const profileRoutes = require('./routes/profileDetails')
const prevDataRoutes = require('./routes/prevData')

require('./models/project')
require('./models/assignment')
require('./models/internship')

app.use(express.json())

app.use(require('./routes/project'))
app.use(require('./routes/assignment'))
app.use(require('./routes/internship'))

app.use('/profile',profileRoutes)
app.use('/prevData',prevDataRoutes)
app.use('/uploads',express.static('../Student/uploads'))

mongoose.connect(MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err))

app.listen(PORT,()=>{
    console.log("server is running on ",PORT)
})
