new_element=document.createElement("script");
new_element.setAttribute("type","text/javascript");
new_element.setAttribute("src","js/alert.js");// 在这里引入了alert.js
document.body.appendChild(new_element);
$(function () {
    //获取用户信息
    $.ajax({
        type: "POST",
        url: "/getUser",
        contentType: "application/json",
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            //得到用户信息
            var user = data;
            //渲染用户信息
            addUser(user);

        },
        error: function (json) {
            newAlert("获得用户信息错误");
        }
    });
});
$(document).on("click", "#delete", function () {
    var uId = Number($(this).parents(".item-div").find(".uId-div").html());
    //删除用户
    $.ajax({
        type: "POST",
        url: "/deleteUser",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            "uId":uId
        }),
        async: true,
        cache: false,
        success: function (data) {
            newAlert("用户删除成功!");
            window.location.href = '/adminUser';
        },
        error: function (json) {
            newAlert("删除用户错误");
        }
    });
});

function addUser(user) {
    for (var index = 0; index < user.length; index++) {
        var uId = user[index].uId;
        var uname = user[index].uname;
        var status;
        if (user[index].status == 1) {
            status = "普通用户";
        } else {
            status = "管理员";
        }
        var password = user[index].password;

        var itemDiv = "<div class='item-div'>" +
            "<div class='uId-div'>" + uId + "</div>" +
            "<div class='uname-div'>" + uname + "</div>" +
            "<div class='status-div'>" + status + "</div>" +
            "<div class='button-div'>" +
            "<button id='delete'>删除</button>" +
            "</div></div>";

        $("body").append(itemDiv);
    }
}