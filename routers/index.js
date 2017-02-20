const express = require('express')
const db = require('../db')
const router = express.Router()
// -----------
var page
router.post('/xiao/page', (req, res) => {
    page = req.body.page
    res.send('success')
})
// -----------主页渲染
router.get('/', (req, res) => {
    if (req.cookies.user) {
        db.Log.find({ user: req.cookies.user._id }).count().exec().then(count => {
            count = count % 2 == 0 ? count / 2 : Math.floor(count / 2) + 1
            page = page > count ? count : page
            if (!page || page < 1) { page = 1 }
            var a = db.Log.find({ user: req.cookies.user._id })
                .sort({ date: -1 }).skip((page - 1) * 2).limit(2).exec()
            var b = db.User.find().exec()
            var c = db.User.find({ section: '前端组' }).exec()
            var d = db.User.find({ section: '服务端组' }).exec()
            var e = db.User.find({ section: '客户端组' }).exec()
            Promise.all([a, b, c, d, e]).then(function (data) {
                res.render('index', {
                    name: req.cookies.user.name,
                    isManager: req.cookies.user.isManager,
                    logs: data[0],
                    users: data[1],
                    web: data[2],
                    server: data[3],
                    client: data[4],
                    page: page
                })
            })
        })
    } else {
        res.render('index')
    }
})
// -----------日志界面渲染
router.get('/log/:id', (req, res) => {
    db.Log.find({ user: req.params.id }).count().exec().then(count => {
        count = count % 2 == 0 ? count / 2 : Math.floor(count / 2) + 1
        page = page > count ? count : page
        if (!page || page < 1) { page = 1 }
        db.Log.find({ user: req.params.id })
            .sort({ date: -1 }).skip((page - 1) * 2).limit(2)
            .exec().then(logs => {
                res.render('log', {
                    name: req.cookies.user.name,
                    logs: logs,
                    page: page
                })
            })
    })
})
// -----------退出当前账户
router.get('/xiao/user/sigout', (req, res) => {
    res.clearCookie('user')
    res.redirect('/')
})
// -----------修改当前账户密码
router.post('/xiao/user/alterpassword', (req, res) => {
    if (req.body.password1 == req.body.password2) {
        res.json({ code: 'fail', message: '当前密码与新密码不能一样！' })
    } else {
        db.User.find({ _id: req.cookies.user._id, password: req.body.password1 }).count().then((model) => {
            if (model > 0) {
                db.User.update({ _id: req.cookies.user._id }, { $set: { password: req.body.password2 } }).exec().then(() => {
                    res.json({ code: 'success', message: '修改成功!' })
                }).catch((err) => {
                    res.json({ code: 'error', message: '服务端错误！' })
                })
            } else {
                res.json({ code: 'fail', message: '当前密码错误！' })
            }
        }).catch((err) => {
            res.json({ code: 'error', message: '服务端错误！' })
        })
    }
})

module.exports = router
