$(function () {



  $(".loginAlert h1 a").click(function () {
    $(this).addClass("active").siblings("a").removeClass("active");
    var index = $(this).index();
    $(this).parents(".loginAlert").find(".box").eq(index).show().siblings(".box").hide();
  })
  $(".loginAlert h2 a").click(function () {
    $(this).addClass("active").siblings("a").removeClass("active");
    var index = $(this).index();
    $(this).parents(".loginAlert").find(".inputBox").eq(index).show().siblings(".inputBox").hide();
  });
  $(".registerBtn").click(function () {
    layer.open({
      type: 1,
      title: false,
      closeBtn: 0,
      shadeClose: true,
      skin: 'yourclass',
      area: 'auto',
      maxWidth: "auto",
      maxHeight: "auto",
      resize: false,
      content: $(".roleSelection")
    });
  })

  $(".forget").click(function(){
    layer.open({
      type: 1,
      title: false,
      closeBtn: 0,
      shadeClose: true,
      skin: 'yourclass',
      area: 'auto',
      maxWidth: "auto",
      maxHeight: "auto",
      resize: false,
      content: $(".getPass")
    });
  })

  function logintiao(e) {
    $(".loginAlert").show();
    $(document).one("click", function () {
      $(".heander .loginAlert").hide();
    });
    e.stopPropagation();
  }

  $(".nav .loginBtn").on("click", function (e) {
    logintiao(e)
  });
  $(".loginAlert").on("click", function (e) {
    e.stopPropagation();
  });



});

function setCookie(username, password, aa) {
  var username = username.val();
  var password = password.val();
  var aa = aa; //获取是否选中
  if (aa == true) { //如果选中-->记住密码登录
    $.cookie("username", username.trim(), 7); //有效时间7天，也可以设置为永久，把时间去掉就好
    $.cookie("password", password.trim(), 7);
  } else { //如果没选中-->不记住密码登录
    $.cookie("passWord", "");
    $.cookie("userName", "");
  }
}


function getCookie(form) { //获取cookie
  var cookit_username = $.cookie("username"); //获取cookie中的用户名    
  var cookit_pwd = $.cookie("password"); //获取cookie中的登陆密码
  var username = $(form).find($("input[name = username]"));
  var password = $(form).find($("input[name = password]"));
  var aa = $(form).find($("input[type='checkbox']"));
  if (username.val() == cookit_username) {
    if (cookit_pwd) { //密码存在的话把“记住用户名和密码”复选框勾选住
      aa.attr("checked", "true");
    }
    if (cookit_username != "") { //用户名存在的话把用户名填充到用户名文本框    
      username.val(cookit_username);
    } else {
      username.val("");
    }
    if (cookit_pwd != "") { //密码存在的话把密码填充到密码文本框
      password.val(cookit_pwd);
    } else {
      password.val("");
    }
  }
}

function check(form) {
  var validate2 = {
    username: false,
    password: false,
  };
  var username = $(form).find($("input[name = username]"));
  var password = $(form).find($("input[name = password]"));
  var aa = $(form).find($("input[type='checkbox']")).is(":checked");
  var iframe = $(form).find($("#form")).text();
  if (username.val() == "") {
    username.siblings(".error").text("请输入手机号/帐号");
    validate2.username = false;
    return;
  } else {
    username.siblings(".error").text("");
    validate2.username = true;
  }
  if (password.val() == "") {
    password.siblings(".error").text("请输入密码");
    validate2.password = false;
    return;
  } else {
    password.siblings(".error").text("");
    validate2.password = true;
  }

  var isOK = validate2.username && validate2.password;
  if (isOK & aa == true) {
    setCookie(username, password, aa); //调用设置Cookie的方法 
    form.submit();
    setTimeout(function () {
      // window.location.href = 'http://127.0.0.1:8082/pages/%E9%A1%B6%E7%BA%A7%E8%81%8C%E4%BD%8D.html'
      showUserOrHide();
    }, 1000)
  } else {
    form.submit();
    setTimeout(function () {
      // window.location.href = 'http://127.0.0.1:8082/pages/%E9%A1%B6%E7%BA%A7%E8%81%8C%E4%BD%8D.html'
      showUserOrHide();
    }, 1000)
  }

}