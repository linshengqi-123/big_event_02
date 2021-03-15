$(function () {
    // 需求 ajax 获取用户信息，渲染到页面
    // 这个功能 ，后面其他页面/模块还要用，所以必须设置为全局函数

    getUserInfo()
    // 退出功能
    let layer = layui.layer;
    $("#btnLogout").on("click", function () {
        layer.confirm("是否确定退出登录？", { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem("token")
            location.href = "/login.html";

            // 关闭弹窗
            layer.close(index);
        })
    })
    // 位置 定位 存储单元 location
    // console.log(location);

    // console.log(localStorage);



});
// 必须保证这个函数是全局的，后面其他功能要用
function getUserInfo() {


    $.ajax({
        url: '/my/userinfo',
        // 配置头信息，设置token，身份识别认证！

        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function (res) {

            if (res.status != 0) {
                return layui.layer.msg(res.message, { icon: 5 })
            }

            // 用于头像和文字渲染
            renderAvatar(res.data);

        }
    });
}
// 头像和文字渲染封装
function renderAvatar(user) {
    // console.log(user);
    // 渲染用户名，如果有昵称以昵称为准 或者 使用账号（username）用户名渲染
    // 昵称 nickname
    let name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name)
    // 渲染头像；判断图片头像是否存在
    // user_pic 用户头像
    if (user.user_pic == null) {
        // 隐藏图片头像，渲染文字头像
        $(".layui-nav-img").hide();
        // 渲染文字头像 现在比较流行的使用文字首字体渲染文字头像
        $(".text-avatar").show().html(name[0].toUpperCase());

    } else {
        // 渲染图片头像，隐藏文字头像
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".text-avatar").hide();
    }
}