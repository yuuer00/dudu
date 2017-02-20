const express = require('express'),
    template = require('./template'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser')

template.config('cache', false)
const app = express()

app.engine('.html', template.__express)
app.set('view engine', 'html')
app.use(express.static('www'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(require('./routers/index'))
app.use(require('./routers/register'))
app.use(require('./routers/alter'))
app.use(require('./routers/writeLog'))

app.listen(3000, () => { console.log('正在运行...') })