new_element=document.createElement("script");
new_element.setAttribute("type","text/javascript");
new_element.setAttribute("src","js/alert.js");// 在这里引入了alert.js
document.body.appendChild(new_element);
$(function () {
    $("#admin-iframe").attr("src","adminUser.html");
    $("#user").css({
        "color": "#C20C0C",
        "border-bottom-color": "#C20C0C"
    });
    $(".nav-div-item").click(function () {
        $(this).css({
            "color": "#C20C0C",
            "border-bottom-color": "#C20C0C"
        });
        $(this).siblings().css({
            "color": "gray",
            "border-bottom-color": "gray"
        });
        $("#admin-iframe").attr("src",$(this).attr("name"));
    });
});