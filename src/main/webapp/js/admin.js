
$(function () {
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

window.onload = function () {
    document.getElementById("user").click();
};