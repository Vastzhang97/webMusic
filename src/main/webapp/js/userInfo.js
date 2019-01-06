new_element=document.createElement("script");
new_element.setAttribute("type","text/javascript");
new_element.setAttribute("src","js/alert.js");// 在这里引入了alert.js
document.body.appendChild(new_element);

$(function () {
    var uname = window.localStorage.getItem("uname");
    var password = window.localStorage.getItem("password");

    $("#uname").val(uname);
    $("#password").val(password);

    $("#update").click(function () {
        var uname = $("#uname").val();
        var password = $("#password").val();
        window.localStorage.setItem("uname", uname);
        window.localStorage.setItem("password", password);
        newAlert("修改成功");
    });

    // //获取最新歌曲
    $.ajax({
        type: "POST",
        url: "/getNewMusic",
        contentType: "application/json",
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            //得到最新歌曲
            newMusic = data;
            //渲染最新歌曲
            addNewMusic(newMusic);

        },
        error: function (json) {
            newAlert("获得最新歌曲错误");
        }
    });

});
//渲染最新歌曲
function addNewMusic(newMusic) {
    console.log(newMusic);
    for (var index = 0; index < newMusic.length; index++) {
        var newMusicId = newMusic[index].mId;//获取歌曲id
        var newMusicSrc = newMusic[index].musicSrc;//获取歌曲资源
        var newMusicTitle = newMusic[index].mTitle;//获取歌曲标题
        var newMusicAlbum = newMusic[index].mAlbum;//获取歌曲专辑
        var newMusicSinger = newMusic[index].mSinger;//获取歌手名
        //最新歌曲div
        var newDivList = "<div class='new-div-list' id=" + newMusicId + ">" +
            "<div class='new-div-list-item-left'>" +
            "<div class='new-div-list-item-title'>" +
            newMusicTitle +
            "</div>" +
            "<div class='new-div-list-item-album'>" +
            newMusicAlbum + "-" + newMusicSinger +
            "</div>" +
            "</div>" +
            "<div class='new-div-list-item-right'>" +
            "<img src='images/play.png' />" +
            "</div>" +
            "</div>" ;
        $(".new-div").append(newDivList);
    }
};