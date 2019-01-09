new_element=document.createElement("script");
new_element.setAttribute("type","text/javascript");
new_element.setAttribute("src","js/alert.js");// 在这里引入了alert.js
document.body.appendChild(new_element);

$(function () {
    $("#register").click(function () {
        var uname = $("#uname").val();
        var password = $("#password").val();
        //注册
        $.ajax({
            type: "POST",
            url: "/register",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                "uName": uname,
                "password": password
            }),
            async: true,
            cache: false,
            success: function (data) {
                window.location.href = '/login';
            },
            error: function (json) {
                newAlert("注册错误");
            }
        });
    });
});