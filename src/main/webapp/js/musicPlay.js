// var comment = [{
//     "cId": 1,
//     "cUName": "aaa",
//     "cDate": "2018-12-25",
//     "cContent": "aaa4564654654564564",
//     "cUHeadImg": "images/1.jpg",
//     "cReplyId": 0
// }, {
//     "cId": 2,
//     "cUName": "qqq",
//     "cDate": "2018-12-25",
//     "cContent": "qqq45646qqq5qqq64",
//     "cUHeadImg": "images/1.jpg",
//     "cReplyId": 0
// }, {
//     "cId": 3,
//     "cUName": "eeeee",
//     "cDate": "2018-12-25",
//     "cContent": "qqq4eeeeeq64",
//     "cUHeadImg": "images/1.jpg",
//     "cReplyId": 1
// }];
var mid = Number(window.localStorage.getItem("id"));
var music = JSON.parse(window.localStorage.getItem("music"));
var uName = window.localStorage.getItem("uname");
console.log(mid);
console.log(music);
var musicSrc = music.musicSrc;
var mTitle = music.mTitle;
console.log(mTitle);
var mSinger = music.mSinger;
var mLyrics = music.mLyrics;
var mCompose = music.mCompose;
//初始化
$(function () {
    $("#musicAudio").attr("src",musicSrc);
    $(".musicTitle").html(mTitle);
    $(".musicSinger").html(mSinger);
    $(".musicCompose").html(mCompose);
    $(".musicLyrics").html(mLyrics);
    //获取歌曲评论
    $.ajax({
        type: "POST",
        url: "/getMusicComment",
        contentType: "application/json",
        data: JSON.stringify({
            "mid": mid
        }),
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            //得到歌曲评论
            var comment = data;
            //渲染歌曲评论
            addMusicComment(comment);

        },
        error: function (json) {
            alert("获得歌曲评论错误");
        }
    });

    $("#collect").click(function () {
        var index = $(this).attr("name");
        if(index == "1"){
            $(this).attr("src","images/collect.png");
            $(this).attr("name","2");
            alert("收藏成功");
        }else{
            $(this).attr("src","images/collect2.png");
            $(this).attr("name","1");
            alert("已取消收藏");
        }
    });

    $("#addComment").click(function () {
        var comment = $("#comment").val();
        if(uName == "" || uName == null ||uName == undefined){
            alert("请先登录!");
            window.location.href = '/login';
        }else {
            if(comment == "" || comment == null){
                alert("请输入评论内容!");
            }else{
                //发布评论
                $.ajax({
                    type: "POST",
                    url: "/addComment",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify({
                        "cContent": comment,
                        "cUName":uName,
                        "cUHeadImg":"images/1.jpg",
                        "mid":mid
                    }),
                    async: true,
                    cache: false,
                    success: function (data) {
                        addMusicComment(data);
                    },
                    error: function (json) {
                        alert("发布评论错误");
                    }
                });
            }

        }
    });

});

//图片滚动参数
var is_rock = false;
var rot = 10 - 0;
var time;
var audio = document.getElementById("musicAudio");
$(document).on("click", "#play", function () {
    if (is_rock == true) {
        window.clearInterval(time);
        $(this).attr("src", "images/play.png");
        audio.pause();
        is_rock = false;
    }
    else {
        time = window.setInterval(begin, 25);
        $(this).attr("src", "images/stop.png");
        audio.play();
        is_rock = true;
    }
});
window.onload = function () {
    document.getElementById("play").click();
};

function begin(time) {
    document.getElementById("album-img").style.transform = "rotatez(" + rot + "deg)";
    rot += 0.5;
}


//渲染歌曲评论
function addMusicComment(comment) {
    $("#comment").val("");
    for (var index = 0; index < comment.length; index++) {
        console.log(comment[index].cId);
        var cId = comment[index].cId;//评论id
        var cUName = comment[index].cUName;//评论者用户名
        var cDate = comment[index].cDate;//评论日期
        var cContent = comment[index].cContent;//评论内容
        var cUHeadImg = comment[index].cUHeadImg;//评论者头像
        var cReplyId = comment[index].cReplyId;//回复的评论id,0为音乐评论
        var commentDivContent = "";//被回复评论div
        if (cReplyId != 0) {
            //被回复用户名
            var replyName = $(".commnet-div-out").find("#" + cReplyId + "").find(".comment-div-uName").html();
            //被回复评论内容
            var replyCommentContent = $(".commnet-div-out").find("#" + cReplyId + "").find(".comment-div-content").html();

            commentDivContent = "<div class='comment-div-content'>回复" +
                "<span class='reply'>@" + replyName + "</span>:" + cContent + "" +
                "</div>" +
                "<div class='comment-div-reply'>" + replyCommentContent + "</div>";
        } else {
            commentDivContent = "<div class='comment-div-content'>" +
                cContent +
                "</div>";
        }

        //评论div
        var commentDivItemHead = "<div id=" + cId + " class='comment-div-item'>"
        var commentDivHead = "<div class='comment-div-head'>";
        var commentDivHeadImg = "<img class='head' src=" + cUHeadImg + " />";
        var commentDivTail = "</div>";
        var commentDivListHead = "<div class='comment-div-list'>";
        var commentDivUName = "<div class='comment-div-uName'>" + cUName + "</div>";
        var commentDivCDate = "<div class='commnet-div-date'>" + cDate + "</div>";
        var commentDivListTail = "</div>";
        var commentDivItemTail = "</div>";
        var commentDivItem = commentDivItemHead + commentDivHead + commentDivHeadImg + commentDivTail + commentDivListHead +
            commentDivUName + commentDivCDate + commentDivContent + commentDivListTail + commentDivItemTail;
        $(".commnet-div-out").append(commentDivItem);
    }
};