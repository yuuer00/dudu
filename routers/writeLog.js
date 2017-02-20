const express = require('express'),
    tools = require('../tools'),
    db = require('../db')
const router = express.Router()

router.get('/user/writeLog', tools.signin, (req, res) => {
    res.render('writeLog', { name: req.cookies.user.name })
})
var time = new Date()
var date = new Date(time.getFullYear(), time.getMonth(), time.getDate())

// ----------------日志处理
router.post('/xiao/user/writeLog', tools.signin, (req, res) => {
    db.Log.find({
        user: req.cookies.user._id,
        date: date
    }).count().exec().then(model => {
        if (model > 0) {
            res.json({ code: 'cover', message: '今天的日志已经提交，是否覆盖？' })
        } else {
            req.body.user = req.cookies.user._id
            req.body.name = req.cookies.user.name
            req.body.date = date
            req.body.time = time
            req.body.ip = tools.formatIP(req.ip)
            log = new db.Log(req.body).save().then(() => {
                db.User.update({
                    _id: req.cookies.user._id
                }, { $set: { project: req.body.project, time: time } }).exec().then(() => {
                    res.json({ code: 'success', message: '提交成功！' })
                })
            }).catch(err => {
                res.json({ code: 'error', message: '服务端错误！' })
            })
        }
    })
})
// --------------覆盖处理
router.post('/xiao/user/cover', tools.signin, (req, res) => {
    db.Log.update({
        user: req.cookies.user._id,
        time: time
    }, { $set: req.body }).exec().then(() => {
        db.User.update({
            _id: req.cookies.user._id
        }, { $set: { project: req.body.project, time: time } }).exec().then(() => {
            res.json({ code: 'success', message: '已覆盖!' })
        })
    }).catch((err) => {
        res.json({ code: 'error', message: '服务端错误！' })
    })
})
module.exports = router
