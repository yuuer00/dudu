const template = require('art-template')
template.config('cache', false)
template.helper('formatTime', function (t) {
    t = new Date(t)
    var M = t.getMonth() + 1,
        d = t.getDate(),
        h = t.getHours(),
        m = t.getMinutes()

    M = M < 10 ? '0' + M : M
    d = d < 10 ? '0' + d : d
    h = h < 10 ? '0' + h : h
    m = m < 10 ? '0' + m : m

    return t.getFullYear() + '-' + M + '-' + d + ' ' + h + ':' + m
})
template.helper('formatDate', function (t) {
    if (t) {
        t = new Date(t)
        var M = t.getMonth() + 1,
            d = t.getDate(),
            w = t.getDay()

        M = M < 10 ? '0' + M : M
        d = d < 10 ? '0' + d : d
        w = ['日', '一', '二', '三', '四', '五', '六'][w]

        return t.getFullYear() + '年' + M + '月' + d + '日 周' + w
    } else {
        return '该用户当前无日志'
    }

})
module.exports = template