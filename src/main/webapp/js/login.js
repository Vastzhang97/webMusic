new_element=document.createElement("script");
new_element.setAttribute("type","text/javascript");
new_element.setAttribute("src","js/alert.js");// 在这里引入了alert.js
document.body.appendChild(new_element);

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