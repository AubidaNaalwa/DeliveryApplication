const express = require('express')
const DeliveryWorker = require('../models/DeliveryWorker')
const Order = require('../models/Order')

const router = express.Router()

router.get('/totalOrders', (req, res) => {
    Order.find({}, function (err, results) {
        if (err)
            res.send(err)
        else
            res.send({ drivers: results })
    })
})

router.post('/addorder', function (req, res) {
    const order = new Order(req.body.order)
    DeliveryWorker.updateOne({ userName: req.body.userName, password: req.body.password },
        { $addToSet: { packages: order._id } }
        , function (err, data) {
            if (err)
                res.send(err)
            else {
                order.save()
                res.end()
            }
    })
})

router.post('/orders', (req, res) => {
    DeliveryWorker.find({ userName: req.body.userName, password: req.body.password }).populate('packages').exec(function (err, data) {
        if (err)
            res.send({ err })
        else
            res.send({ packages: data[0].packages })
    })
})

router.post('/setReceived', (req, res) => {
    Order.findByIdAndUpdate(req.body.id, { received: true }, function (err, data) {
        if (err)
            res.send(err)
        else
            res.end()
    })
})

router.put('/orederrecive', function (req, res) {
    Order.findByIdAndUpdate(req.body.id, { received: true }, function (err, result) {
        if (err)
            res.send(err)
        else
            res.end()
    })
})



module.exports = router