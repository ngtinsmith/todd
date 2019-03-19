const mongoose = require('mongoose')

const workspaceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    dataKey: { type: String, required: true },
    name: { type: String, required: true },
    wsSelected: { type: Boolean, required: true },
})

module.exports = mongoose.model('Workspace', workspaceSchema)