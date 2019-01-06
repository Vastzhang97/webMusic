new_element=document.createElement("script");
new_element.setAttribute("type","text/javascript");
new_element.setAttribute("src","js/alert.js");// 在这里引入了alert.js
document.body.appendChild(new_element);
$(function () {
    //获取音乐信息
    $.ajax({
        type: "POST",
        url: "/getNewMusic",
        contentType: "application/json",
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            //得到音乐信息
            var music = data;
            //渲染音乐信息
            addMusic(music);

        },
        error: function (json) {
            newAlert("获得音乐信息错误");
        }
    });
});
$(document).on("click", "#delete", function () {
    var mId = Number($(this).parents(".item-div").find(".mId-div").html());
    //删除音乐
    $.ajax({
        type: "POST",
        url: "/deleteNewMusic",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            "mid":mId
        }),
        async: true,
        cache: false,
        success: function (data) {
            newAlert("删除音乐成功!")
            window.location.href = '/adminMusic';
        },
        error: function (json) {
            newAlert("删除音乐错误");
        }
    });
});

function addMusic(music) {
    for (var index = 0; index < music.length; index++) {
        var mId = music[index].mId;
        var mTitle = music[index].mTitle;
        var mSinger = music[index].mSinger;

        var itemDiv = "<div class='item-div'>" +
            "<div class='mId-div'>" + mId + "</div>" +
            "<div class='mTitle-div'>" + mTitle + "</div>" +
            "<div class='mSinger-div'>" + mSinger + "</div>" +
            "<div class='button-div'>" +
            "<button id='delete'>删除</button>" +
            "</div></div>";

        $("body").append(itemDiv);
    }
}