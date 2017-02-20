const express = require('express')
const db = require('../db')
const router = express.Router()
// --------------重置密码
router.post('/xiao/alter/reset/:id', (req, res) => {
    db.User.update({ _id: req.params.id }, { $set: { password: "123456" } }).exec().then(() => {
        res.json({ code: 'success', message: '重置成功!' })
    }).catch((err) => {
        console.log(err)
        res.json({ code: 'error', message: '服务端错误！' })
    })
})
// --------------删除用户
router.post('/xiao/alter/remove/:id', (req, res) => {
    db.User.remove({ _id: req.params.id }).exec().then(() => {
        res.json({ code: 'success', message: '删除成功!' })
    }).catch((err) => {
        console.log(err)
        res.json({ code: 'error', message: '服务端错误！' })
    })
})
// --------------修改用户
router.post('/xiao/alter/alter/:id', (req, res) => {
    db.User.update({ _id: req.params.id }, { $set: req.body }).exec().then(() => {
        res.json({ code: 'success', message: '修改成功!' })
    }).catch((err) => {
        console.log(err)
        res.json({ code: 'error', message: '服务端错误！' })
    })
})
module.exports = router