const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const crypto = require('crypto')

const Workspace = require('../model/workspace.model')

// GET
router.get('/', (req, res, next) => {
    Workspace.find()
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
router.post('/', (req, res, next) => {

    const generateDataKey = () => {
        return crypto.randomBytes(6).toString('hex')
    }

    // create key duplication checker before post

    const workspace = new Workspace({
        _id: new mongoose.Types.ObjectId(),
        dataKey: generateDataKey(),
        name: req.body.name,
        wsSelected: req.body.wsSelected,
    })

    console.log(req.body.wsSelected)
 
    workspace.save()
        .then(result => {
            res.status(200).json({
                message: 'Created workspace successfully',
                createdWorkspace: {
                    _id: result._id,
                    dataKey: result.dataKey,
                    name: result.name,
                    wsSelected: result.wsSelected,
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

// DELETE
router.delete('/:workspaceId', (req, res) => {
    const id = req.params.workspaceId
    Workspace.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: `Workspace #${id} Deleted`,
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

// UPDATE
// router.patch('/:listId', (req, res, next) => {
//     const id = req.params.listId
//     const updateOps = {}

//     // patch only the specified property(s)
//     for (const ops of req.body) {
//         updateOps[ops.propName] = ops.value
//     }

//     List.update({_id: id}, { $set: updateOps })
//         .exec()
//         .then(result => {
//             res.status(200).json({
//                 message: 'Product updated',
//                 request: {
//                     type: `GET`,
//                     url: `http://localhost:3000/list/${id}`
//                 }
//             })
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({
//                 error: err
//             })
//         })
// })

module.exports = router
