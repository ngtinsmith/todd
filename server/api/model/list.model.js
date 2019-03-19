const mongoose = require('mongoose')

const listSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    dataKey: { type: String, required: true, unique: true },
    workspace: { type: String, required: true },
    title: { type: String, required: true },
    nodes: { type: Array, required: true },
    order: { type: Number },
})

module.exports = mongoose.model('List', listSchema)