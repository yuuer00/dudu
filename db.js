const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/firm')
mongoose.connection.on('connected',()=>{
    console.log('数据库连接成功...')
})

exports.User = mongoose.model('users',{
    name:String,
    password:String,
    isManager:Boolean,
    createTime:Date,
    phone:String,
    section:String,
    project:String,
    time:Date,
    ip:String
})

exports.Log = mongoose.model('logs',{
    user:'ObjectId',
    name:String,
    date:Date,
    time:Date,
    project:String,
    forenoon:String,
    afternoon:String,
    night:String,
    ip:String
})