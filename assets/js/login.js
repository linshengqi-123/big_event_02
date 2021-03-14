$(function () {
    // 登录页面
    $("#link_login").on("click", function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    // 注册页面
    $("#link_reg").on("click", function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })


    // 需求自定义layui 校验规则
    // 自定义验证规则
    var form = layui.form;
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,12}$/,
            "密码必须6-12位，且不能输入空格"
        ],
        repwd: function (value, item) {
            // 获取两个密码框的val
            console.log($(".reg-box input[name=password]").val());
            console.log($(".reg-box input[name=repassword]").val());


            // 比较
            if (value != $(".reg-box input[name=password]").val()) {
                return "两次输入的密码不一致"
            }
        }

    })
    // 注册功能
    var layer = layui.layer;
    $("#form_reg").on("submit", function (e) {
        // 阻止表单提交
        e.preventDefault();
        $.ajax({
            type: 'POST',
            // method: 'POST',
            url: '/api/reguser',
            data: {
                // 获取用户名和密码
                username: $(".reg-box input[name=username]").val(),
                password: $(".reg-box input[name=password]").val(),
            },
            success: (res) => {
                console.log(res);
                console.log(layer);

                if (res.status != 0) {
                    // message   信息
                    return layer.msg(res.message, { icon: 5 });
                }
                // 提交成功后处理代码
                layer.msg('恭喜您!用户名创建成功,请登录!');
                // 手动切换到登录表单
                $("#link_login").click();
                // 重置form表单
                $("#form_reg")[0].reset();
            }
        })
    })
    $("#form_login").on("submit", function (e) {
        // 阻止表单提交
        e.preventDefault();
        $.ajax({
            type: 'POST',
            // method: 'POST',
            url: '/api/login',
            // 序列化
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 提交成功后处理代码
                layer.msg('恭喜您!登录成功!');
                alert('恭喜您!登录成功!')
                //    保存token,未来的接口要使用token
                localStorage.setItem('token', res.token);
                // 跳转
                location.href = "/index.html";

            }
        })
    })

})
