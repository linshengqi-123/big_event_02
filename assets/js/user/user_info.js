$(function () {
    let form = layui.form;
    // console.log(layui);
    // console.log(form);
    // 1.校验规则定义
    form.verify({
        nickname: function (value) {
            // console.log(value);
            // 判断用户名长度
            if (value.trim().length < 1 || value.trim().length > 6) {
                return "用户昵称必须在 1 ~ 6 位之间"
            }
        }
    })
    // 2.展示用户信息（后面这个功能还要用，所以封装成函数）
    let layer = layui.layer;
    // console.log(layer);
    initUserInfo();
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: (res) => {
                // console.log(res.data);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });

                }
                // 成功后渲染用户信息
                form.val("formUserInfo", res.data);
            }

        })
    }
    // 3.重置
    $("#btnReset").on("click", function (e) {
        // 阻止原本作用
        e.preventDefault();
        // 用上面的用户渲染方法实现重新渲染回来
        initUserInfo();
    });
    // 4.修改用户信息
    $("form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            // 序列化 产生一个可存储的值的表示 串行化
            data: $(this).serialize(),
            success: (res) => {

                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg("恭喜您，用户信息修改成功！", { icon: 6 });
                window.parent.getUserInfo();
            }
        })
    })

})