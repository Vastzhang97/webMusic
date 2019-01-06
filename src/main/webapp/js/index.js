// var album = [{
//     "aImgSrc": "images/1.jpg",
//     "aTitle": "第一个",
//     "aPlayNum": 23213
// }, {
//     "aImgSrc": "images/1.jpg",
//     "aTitle": "第二个",
//     "aPlayNum": 8789
// }, {
//     "aImgSrc": "images/1.jpg",
//     "aTitle": "第三个",
//     "aPlayNum": 989
// }, {
//     "aImgSrc": "images/1.jpg",
//     "aTitle": "第四个",
//     "aPlayNum": 777
// }, {
//     "aImgSrc": "images/1.jpg",
//     "aTitle": "第五个",
//     "aPlayNum": 686
// }, {
//     "aImgSrc": "images/1.jpg",
//     "aTitle": "第六个",
//     "aPlayNum": 656
// }];

// var newMusic = [{
//     "mId": 1,
//     "mSinger": "阿三",
//     "mTitle": "第一个",
//     "mAlbum": "ad"
// }, {
//     "mId": 2,
//     "mSinger": "阿三",
//     "mTitle": "第一个",
//     "mAlbum": "ad"
// }, {
//     "mId": 3,
//     "mSinger": "阿三",
//     "mTitle": "第一个",
//     "mAlbum": "ad"
// }, {
//     "mId": 4,
//     "mSinger": "阿三",
//     "mTitle": "第一个",
//     "mAlbum": "ad"
// }, {
//     "mId": 5,
//     "mSinger": "阿三",
//     "mTitle": "第一个",
//     "mAlbum": "ad"
// }, {
//     "mId": 6,
//     "mSinger": "阿三",
//     "mTitle": "第一个",
//     "mAlbum": "ad"
// }];
new_element=document.createElement("script");
new_element.setAttribute("type","text/javascript");
new_element.setAttribute("src","js/alert.js");// 在这里引入了alert.js
document.body.appendChild(new_element);

var newMusic = [];
//初始化
$(function () {

    //获取推荐歌单
    $.ajax({
        type: "POST",
        url: "/getIntroAlbum",
        contentType: "application/json",
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            console.log("getIntroAlbum");
            //得到推荐歌单
            var album = data;
            //渲染推荐歌单
            addIntroAlbum(album);

        },
        error: function (json) {
            newAlert("获得推荐歌单错误");
        }
    });

    //获取最新歌曲
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


$(document).on("click", ".new-div-list", function () {
    var id = $(this).attr("id");
    console.log(id);
    window.localStorage.setItem("id", id);
    for (var index = 0; index < newMusic.length; index++){
        if(newMusic[index].mId == id){
            window.localStorage.setItem("music", JSON.stringify(newMusic[index]));
        }
    }
    window.location.href = '/musicPlay';
});
$(document).on("click", ".userHead", function () {
    if(window.localStorage.getItem("uname") == null || window.localStorage.getItem("uname") == undefined){
        window.location.href = '/login';
    }else{
        window.location.href = '/userInfo';
    }

});

//渲染推荐歌单
function addIntroAlbum(album) {
    for (var index = 0; index < album.length; index++) {
        var albumImgSrc = album[index].aImgSrc;//获取歌单封面
        var albumpTitle = album[index].aTitle;//获取歌单标题
        var AlbumPlayNum = album[index].aPlayNum;//获取歌单播放量
        //推荐歌单div
        var introDivListItem = "<div class='intro-div-list-item'>" +
            "<div class='intro-div-list-item-img'>" +
            "<span class='intro-div-list-item-num'>" + AlbumPlayNum + "</span>" +
            "<img src=" + albumImgSrc + " />" +
            "</div>" +
            "<div class='intro-div-list-item-title'>" +
            albumpTitle +
            "</div>" +
            "</div>";
        $(".intro-div-list").append(introDivListItem);
    }
};

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
