const express = require('express')
const db = require('../db')
const tools = require('../tools')
const router = express.Router()

router.get('/user/register', (req, res) => {
    res.render('register')
})
// ----------------登陆处理
router.post('/xiao/user/signin', (req, res) => {
    db.User.find(req.body, '-password').then(models => {
        if (models.length > 0) {
            res.cookie('user', models[0].toObject())
            res.json({ code: 'success', message: '登陆成功' })
        } else {
            res.json({ code: 'fail', message: '账号或密码错误！' })
        }
    }).catch(err => {
        res.json({ code: 'error', message: '服务端错误！' })
    })
})
// ----------------注册处理
router.post('/xiao/user/register', (req, res) => {
    req.body.isManager = req.body.section == '老板' ? true : false
    db.User.find({ name: req.body.name }).count().then(model => {
        if (model > 0) {
            res.json({ code: 'fail', message: '该用户已注册！' })
        } else {
            req.body.createTime = new Date()
            req.body.ip = tools.formatIP(req.ip)
            user = new db.User(req.body).save().then(model => {
                res.json({ code: 'success', message: '注册成功！！！请登录' })
            }).catch(err => {
                res.json({ code: 'error', message: '服务端错误！' })
            })
        }
    })
})
module.exports = router