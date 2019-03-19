const mongoose = require('mongoose')

const nodeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    value: { type: String, required: true, },
    state: { 
        view: { type: String, default: 'is-expanded' },
        checked: { type: Boolean, default: false },
    },
    descendant: [this] // use 'this'/nodeSchema itself recursively
})

module.exports = mongoose.model('Node', nodeSchema)