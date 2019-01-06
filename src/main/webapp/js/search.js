new_element=document.createElement("script");
new_element.setAttribute("type","text/javascript");
new_element.setAttribute("src","js/alert.js");// 在这里引入了alert.js
document.body.appendChild(new_element);

var newMusic = [];
$(function () {
    $(".search-div").click(function () {
        var search = $("#search").val();
        $("#search").val("");
        if(search == null ||search == ""){
            alert("请输入要搜索的歌曲!")
        }else{
            //获取搜索歌单
            $.ajax({
                type: "POST",
                url: "/getSearchMusic",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({
                    "search": search
                }),
                async: true,
                cache: false,
                success: function (data) {
                    console.log("getIntroAlbum");
                    //获取搜索歌单
                    newMusic = data;
                    //渲染搜索歌单
                    addSearchMusic(newMusic);

                },
                error: function (json) {
                    newAlert("获取搜索歌单错误");
                }
            });
        }
    });
})

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

//渲染搜索歌曲
function addSearchMusic(newMusic) {
    $(".new-div").empty();
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