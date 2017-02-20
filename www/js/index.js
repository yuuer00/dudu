// ------------登陆请求
$('.modal .modal-dialog .modal-content .modal-footer .btn-primary').click(function () {
    var data = $('#signin').serialize()
    $.ajax({
        url: '/xiao/user/signin',
        data: data,
        type: 'POST',
        dataType: 'json'
    }).done(function (res) {
        if (res.code == 'success') {
            location.href = '/'
        } else {
            $('#signinModal .modal-body small').css('display', '').text(res.message).fadeOut(2000)
        }
    }).fail(function () {
        alert('网络连接失败，请稍后再试...')
    })
})
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
// ------------添加用户请求
$('#addModal .btn-primary').click(function () {
    var data = $('#addModal form').serialize()
    $.ajax({
        url: '/xiao/user/register',
        data: data,
        type: 'POST',
        dataType: 'json'
    }).done(function (res) {
        if (res.code == 'success') {
            alert('添加成功！')
            location.reload()
        } else {
            alert('该用户已存在！  ')
        }
    }).fail(function () {
        alert('服务端错误，请稍后再试...')
    })
})

// ------------重置密码函数
function resetPassword(id, name) {
    $('#modal').modal('show')
    $('#modal .modal-body').text('确定重置 ' + name + ' 的密码？')
    $('#modal .btn-default').eq(1).off('click').click(function () {
        $.post('/xiao/alter/reset/' + id, (res) => {
            if (res.code == 'success') {
                alert(res.message)
            } else {
                alert(res.message)
            }
        })
    })
}
// ------------删除用户函数
function removeUser(id, name) {
    $('#modal').modal('show')
    $('#modal .modal-body').text('确定删除 ' + name + ' ？')
    $('#modal .btn-default').eq(1).off('click').click(function () {
        $.post('/xiao/alter/remove/' + id, (res) => {
            if (res.code == 'success') {
                alert(res.message)
                location.reload()
            } else {
                alert(res.message)
            }
        })
    })
}
// ------------修改用户函数
function alterUser(id, name, password, phone) {
    $('#alterModal').modal('show')
    $('#alterModal h4').text('修改 ' + name + ' 的信息')
    $('#alterModal #inputPassword3').val(password)
    $('#alterModal #inputPhone3').val(phone)
    $('#alterModal .btn-primary').off('click').click(function () {
        var data = $('#alterModal form').serialize()
        $.post('/xiao/alter/alter/' + id, data, (res) => {
            if (res.code == 'success') {
                alert(res.message)
                location.reload()
            } else {
                alert(res.message)
            }
        })
    })
}
// ----------该用户无日志弹出框
function noLog(name){
    $('#modal').modal('show').find('.modal-body').text(name + '当前没有任何日志')
}
// ------------页码函数
function playPage(ev,page) {
    switch (ev) {
        case 'prev':
            page--
            break;
        case 'curr':
            page = $('#currPage input').val()
            break;
        case 'next':
            page++
            break;
        default:
        page = ev
            break;
    }
    $.post('/xiao/page', { page: page }, (res) => {
        if (res == 'success') {
            location.reload()
        }
    })
}