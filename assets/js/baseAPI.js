// $.ajaxPrefilter() 可以在调用 $.get() $.post() $.ajax() 方法之后，立即触发;
//   接收到 ajax 响应以后，也会触动这个方法;
// 开发环境服务器路径地址
let baseURL = "http://api-breakingnews-web.itheima.net";
// // 测试环境服务器路径地址
// let baseURL = 'http://api-breakingnews-web.itheima.net';
// // 生产环境服务器路径地址
// let baseURL = 'http://api-breakingnews-web.itheima.net';

$.ajaxPrefilter(function (options) {
    console.log(options);
    // 如果是index.html页面，不需要添加前缀 写死的
    if (options.url === 'http://127.0.0.1:5500/index.html') {
        return;
    }
    options.url = baseURL + options.url;
})