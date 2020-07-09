const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const MONGOURI = 'mongodb://localhost/mycargarage'

const profileRoutes = require('./routes/profileDetails')

require('./models/project')
require('./routes/assignment')

app.use(express.json())
app.use(require('./routes/project'))
app.use(require('./routes/assignment'))

app.use('/profile',profileRoutes)
app.use('/uploads',express.static('../Student/uploads'))

mongoose.connect(MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err))

app.listen(PORT,()=>{
    console.log("server is running on ",PORT)
})
