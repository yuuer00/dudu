// ------------登陆请求
$('#signinModal .btn-primary').click(function () {
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
        $('#signinModal .modal-body small').text('网络连接失败，请稍后再试...')
    })
})
// --------------注册请求
$('form').eq(0).submit(function (ev) {
    ev.preventDefault()
    var data = $(this).serialize()
    $.ajax({
        url: '/xiao/user/register',
        data: data,
        type: 'POST',
        dataType: 'json'
    }).done(function (res) {
        if (res.code == 'success') {
            $('#modal').modal('show')
            $('#modal .modal-body').text(res.message)
        } else {
            $('#modal').modal('show')
            $('#modal .modal-body').text(res.message)
        }
    }).fail(function () {
        $('#modal').modal('show')
        $('#modal .modal-body').text('服务端错误，请稍后再试...')
    })
})