const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

const List = require('../model/list.model')

// GET
router.get('/', (req, res) => {

    List.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

// POST
router.post('/', (req, res) => {

    const list = new List({
        _id: new mongoose.Types.ObjectId(),
        dataKey: req.body.dataKey,
        workspace: req.body.workspace,
        title: req.body.title,
        order: req.body.order,
        nodes: req.body.nodes
    })
 
    list.save()
        .then(result => {
            res.status(200).json({
                message: 'Created list successfully',
                list: {
                    _id: result._id,
                    dataKey: result.dataKey,
                    workspace: result.workspace,
                    title: result.title,
                    order: result.order,
                    nodes: result.nodes,
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.patch('/:dataKey', (req, res) => {
    const key = req.params.dataKey
    const updateOps = {}

    // req.body.forEach(ops => {
    //     updateOps[ops.propName] = ops.value
    // })

    const entries = Object.entries(req.body)

    // entries.forEach([key, value] => updateOps[key] = value)

    for (const [key, value] of entries) {
        updateOps[key] = value
    }

    console.log(updateOps)

    console.log(req.body)

    List.updateOne({ dataKey: key }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product updated',
                data: result,
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/api/list/${result._id}`
                }
            })
        })
        .catch(err => {
            // return err
            console.log(err)
            res.status(500).json({
                error: err
            })
        })

    // patch only the specified property(s)
    // for (const ops of req.body) {
    //     updateOps[ops.propName] = ops.value
    // }

    // List.update({ _id: id }, { $set: updateOps })
    //     .exec()
    //     .then(result => {
    //         res.status(200).json({
    //             message: 'Product updated',
    //             request: {
    //                 type: 'GET',
    //                 url: `http://localhost:3000/list/${id}`
    //             }
    //         })
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         res.status(500).json({
    //             error: err
    //         })
    //     })
})

// DELETE
router.delete('/:listId', (req, res) => {
    const id = req.params.listId
    List.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product Deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/list',
                    data: {
                        title: 'String',
                        content: 'String'
                    }
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
    
})

module.exports = router
