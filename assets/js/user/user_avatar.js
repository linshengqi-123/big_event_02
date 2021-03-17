// window.onload 外部的文件和图片音频视频... 全部加载完毕在执行
$(window).on("load", function () {

  // 1.1 获取裁剪区域的 DOM 元素
  let $image = $('#image')
  // console.log($image);
  // 1.2 配置选项
  let options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // console.log(options);
  // 1.3 创建裁剪区域
  $image.cropper(options)
  // 2. 点击按钮，选择图片

  $("#btnChooseImage").on("click", function () {
    $("#file").click();
  })

  // 3.选择图片后，修改裁剪区域
  let layer = layui.layer;

  $("#file").on("change", function (e) {
    // e.target 如果此事件为冒泡执行，e.target指向的就是目标阶段的事件源
    console.log(e);
    var file = e.target.files[0];
    // 非空校验
    if (file === undefined) {
      return layer.msg("用户头像为必传值！")
    }
    var newImgURL = URL.createObjectURL(file)
    console.log(newImgURL);
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域

  })



  // 4.修改头像
  $("#btnUpload").on("click", function () {

    // 获取 base64 格式的头像
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    console.log(typeof dataURL)
    // console.log(dataURL)

    // 发送ajax
    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function (res) {
        // 状态判断
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        // 成功提示，渲染头像
        layer.msg("恭喜您，头像上传成功！");
        window.parent.getUserInfo();
      }
    });

  })
})