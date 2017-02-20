// ------------修改用户密码
$('#alterPasswordModal .btn-primary').click(function () {
    var data = $('#alterPasswordModal form').serialize()
    $.ajax({
        url: '/xiao/user/alterpassword',
        data: data,
        type: 'POST',
        dataType: 'json'
    }).done(function (res) {
        if (res.code == 'success') {
            alert(res.message)
            location.href = '/xiao/user/sigout'
        } else {
            alert(res.message)
        }
    }).fail(function () {
        alert(res.message)
    })
})
// --------------覆盖函数cover
function cover(ev) {
    $.ajax({
        url: '/xiao/user/cover',
        data: ev,
        type: 'POST',
        dataType: 'json'
    }).done(function (res) {
        if (res.code == 'success') {
            alert(res.message)
            location.href = '/'
        } else {
            alert(res.message)
        }
    }).fail(function (res) {
        alert('服务端错误，请稍后再试...')
    })
}
// --------------写日志请求
$('#writeLog').submit(function (ev) {
    ev.preventDefault()
    var data = $(this).serialize()
    $.ajax({
        url: '/xiao/user/writeLog',
        data: data,
        type: 'POST',
        dataType: 'json'
    }).done(function (res) {
        if (res.code == 'cover') {
            $('#modal .btn-default').eq(0).css('display', '')
            $('#modal').modal('show')
            $('#modal .modal-body').text(res.message)
            $('#modal .btn-default').eq(1).off('click').click(function () {
                cover(data)
            })
        } else if (res.code == 'success') {
            $('#modal').modal('show')
            $('#modal .modal-body').text(res.message)
            $('#modal .btn-default').eq(1).off('click').click(function () {
                location.href = '/'
            })
        } else {
            $('#modal').modal('show')
            $('#modal .modal-body').text(res.message)
        }
    }).fail(function () {
        $('#modal').modal('show')
        $('#modal .modal-body').text('服务端错误，请稍后再试...')
    })
})