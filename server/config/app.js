require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

// routes
const workspaceRoute = require('../api/routes/workspace.route')
const listRoute = require('../api/routes/list.route')

const app = express()

mongoose.connect(`mongodb://${process.env.MONGO_URI_USER}:${process.env.MONGO_URI_PASS}@${process.env.MONGO_CLUSTER_PRIMARY},${process.env.MONGO_CLUSTER_SECONDARY_1},${process.env.MONGO_CLUSTER_SECONDARY_2}/${process.env.MONGO_DB_NAME}?${process.env.MONGO_URI_ARGS}`, {
    useNewUrlParser: true,
    useCreateIndex: true
})

// log handler
app.use(morgan('dev'))

// parse json
app.use(express.json())

// handle CORS
app.use(cors())

// API routes
app.use('/api/workspace', workspaceRoute)
app.use('/api/list', listRoute)

// when there is error response --
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

// handle it here
app.use((error, res) => {
    res.status(error.status || 500)
    res.json({
        err: {
            message: error.message
        }
    })
})

module.exports = app