$(function () {
    $("#login").click(function () {
        alert("aaa");
        var uname = $("#uname").val();
        var password = $("#password").val();
        window.localStorage.setItem("uname", uname);
        window.localStorage.setItem("password", password);
        window.location.href = '/index';
    });
});