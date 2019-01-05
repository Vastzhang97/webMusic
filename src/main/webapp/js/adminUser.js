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
            alert("获得用户信息错误");
        }
    });
});
$(document).on("click", "#delete", function () {
    var uId = Number($(this).parent(".item-div").find(".uId-div").html());
    alert(uId);
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