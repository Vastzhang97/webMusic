window.alert = function(txt)
{
    var shield = document.createElement("DIV");
    shield.id = "shield";
    shield.style.position = "absolute";
    shield.style.left = "0px";
    shield.style.top = "0px";
    shield.style.width = "100%";
    shield.style.height = "100%";
    shield.style.background = "#333";
    shield.style.textAlign = "center";
    shield.style.zIndex = "19901000";
    shield.style.filter = "alpha(opacity=.5)";
    shield.style.opacity = ".5";
    var alertFram = document.createElement("DIV");
    alertFram.id="alertFram";
    alertFram.style.position = "absolute";
    alertFram.style.left = "25%";
    alertFram.style.top = "35%";
    alertFram.style.width = "50%";
    alertFram.style.background = "#ccc";
    alertFram.style.overflow = "hidden";
    alertFram.style.textAlign = "center";
    alertFram.style.borderRadius = "5px";
    alertFram.style.zIndex = "19901024";
    strHtml = "<ul style=\"list-style:none;margin:0px;padding:0px;width:100%\">\n";
    strHtml += " <li style=\"background:#FFFFFF;font-size:16px;text-align:center;height:30px;line-height:30px;border-bottom: 1px solid #EBEBEB;\">提 示</li>\n";
    strHtml += " <li style=\"padding:20px;background:#fff;text-align:center;font-size:12px;border-bottom: 1px solid #EBEBEB;\">"+txt+"</li>\n";
    strHtml += " <li style=\"background:#FFFFFF;text-align:center;font-size:14px;height:30px;line-height:30px;\"><span onclick=\"doOk()\" style=\"width: 50%;cursor: pointer;\">确 定</span></li>\n";
    strHtml += "</ul>\n";
    alertFram.innerHTML = strHtml;
    document.body.appendChild(alertFram);
    document.body.appendChild(shield);
    var c = 0;
    this.doAlpha = function(){
        if (c++ > 20){clearInterval(ad);return 0;}
        shield.style.filter = "alpha(opacity="+c+")";
        shield.style.opacity = ".5";
    }
    var ad = setInterval("doAlpha()",5);
    this.doOk = function(){
        //alertFram.style.display = "none";
        //shield.style.display = "none";
        document.body.removeChild(alertFram);
        document.body.removeChild(shield);
    }
    alertFram.focus();
    document.body.onselectstart = function(){return false;};
}
function newAlert(content) {
    alert(content);
}
