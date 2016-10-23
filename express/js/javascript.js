/**
 * Created by Administrator on 2016/10/9.
 */
function city(){
    $.ajax({
        url:"../data/city.json",
        type:"get",
        success:function(data){
            var oLi="",oSpan="",abc="";
            for(var k1 in data){
                oSpan="";
                oLi+="<li class='qu'><span>"+data[k1]["name"]+"：</span>";
                for(var k2 in data[k1]["part"]){
                    oLi+="<a class='sheng' href='javascript:;'>"+data[k1]["part"][k2]["name"]+"</a>";
                    oSpan+="<span class='shi'>";
                    for(var i=0;i<data[k1]["part"][k2]["part"].length;i++){
                        oSpan+="<a href='javascript:;'>"+data[k1]["part"][k2]["part"][i]+"</a>";
                    }
                    oSpan+="</span>";
                }
                oLi+="<div>"+oSpan+"</div></li>";
            }
            $(".more_bot").html(oLi);
            //派送地点击隐藏与显示事件
            $(".sheng").click(function(){
                if($(this).text()=="上海" || $(this).text()=="北京" || $(this).text()=="重庆" || $(this).text()=="天津"){
                    $(this).attr({"href":"index.html"});
                    document.cookie="send="+$(this).text();
                }else{
                    $(".shi").css({"display":"none","background":"#f5f5f5"});
                    $(".shi",$(this).parent("li")).eq($(this).index()-1).css({"display":"block"});
                    $(".sheng").removeClass("on1");
                    $(this).addClass("on1");
                    if(abc==this){
                        $(".shi").css({"display":"none","background":"#fff","color":"#666"});
                        $(".sheng").removeClass("on1");
                        abc="";
                    }else{
                        abc=this;
                    }
                }
            });
            //点击地名存储cookie并刷新页面
            function xdi(that){
                that.click(function(){
                    $(this).attr({"href":window.location});
                    $.cookie("send",$(this).text(),{path:"/"});
                });
            }
            xdi($("a",".more_hot"));
            xdi($("a",".shi"));
            //读取cookie写入派送地
            function send(){
                if($.cookie("send")){
                    var sck1=$.cookie("send");
                    $("b",".psdi").text(sck1);
                }
            }
            send();
        }
    },"json");
}

//显示登录名
function login(){
    if($.cookie("user")){
        $(".login22").html("欢迎您："+$.cookie("user")+" <a class='tuic' style='color: #690' href='../html/login.html'>退出</a>");
        $(".tuic").click(function(){
            $.cookie("user",null,{path:"/"});
        });
    }

}

//动态创建菜单
function menu(data){
    var aLi="";
    for(var k1 in data){
        aLi+="<li>" +
            "<i class='xtb'></i>" +
            "<a class='lei1' id='"+k1+"' href='javascript:;'>"+data[k1]["name"]+"</a>" +
            "<div class='lei2_k'>";
        for(var k2 in data[k1]["hot_r"]){
            aLi+=   "<a class='lei2' id='"+k2+"' href='javascript:;'>"+data[k1]["hot_r"][k2]["name"]+"</a>";
        }
        aLi+=   "</div>" +
            "<div class='me_show'>" +
            "<div class='me_showtop'>";
        for(var k3 in data[k1]["part"]){
            aLi+=       "<div>" +
                "<a class='lei3' id='"+k3+"' href='javascript:;'>"+data[k1]["part"][k3]["name"]+"</a>" +
                "<div class='lei3r'>";
            for(var k4 in data[k1]["part"][k3]["part"]){
                aLi+=           "<a class='lei4' id='"+k4+"' href='javascript:;'><i class='space'></i>"+data[k1]["part"][k3]["part"][k4]["name"]+"</a>";
            }
            aLi+=           "</div>" +
                "</div>";
        }
        aLi+=       "</div>" +
            "<a class='lei5' href='#'>" +
            "<img src=\"../images/"+data[k1]["tuisong"]["src"]+"\" alt=\"\"/>" +
            "</a>" +
            "</div>" +
            "</li>"
    }
    $(".menu_all").html(aLi);
    //菜单划过样式
    for(var i=0;i<$(".xtb").length;i++){
        $(".xtb").eq(i).css({"background-position":"0 "+(-i*16+3)+"px"});
        $("li",".menu_all").eq(i).mouseenter(function(){
            $(".me_show",this).css({"display":"block"});
            $(this).css({"background":"#fff","color":"#690"});
            $(".lei1",this).css({"color":"#690"});
            $(".lei2_k a",this).css({"color":"#690"});
            $(".xtb",this).css({"background-image":"url(\"../images/left_lm_m.png\")"});
            $(this).mouseleave(function(){
                $(".me_show",this).css({"display":"none"});
                $(this).css({"background":"#76ac25"});
                $(".lei1",this).css({"color":"#fff"});
                $(".xtb",this).css({"background-image":"url(\"../images/left_lm_m_b.png\")"});
                $(".lei2_k a",this).css({"color":"#ddeac8"});
            });
        });
    }
    //红色热门分类
    for(var k1 in data){
        for(var k2 in data[k1]["part"]){
            for(var k3 in data[k1]["part"][k2]["part"]){
                if(data[k1]["part"][k2]["part"][k3]["hot"]==1){
                    $("#"+k3).css({"color":"#fa6400"});
                }
            }
        }
    }
}
function fnpost(){
    //回到顶部
    $(".gotop").click(function(){
        $("html").animate({
            "scrollTop":0
        },500);
    });
    //购物车划过
    function huaguo(ohg,move){
        $(ohg).mouseenter(function(){
            flag=false;
            $(move).stop(true,true).delay(500).animate({
                "width":350
            },500);
        });
        $(ohg).mouseleave(function(){
            $(move).delay(500).animate({
                "width":0
            },800);
        });
    }
    huaguo(".gwc_w",".jiex1");
    huaguo(".jilu_w",".jiex2");
    huaguo(".saoma_w",".jiex3");

}
//进入列表页
function golieb(){
    function dianji(that){
        $(that).click(function(){
            window.location="liebiao.html?keyword="+$(this).text();
        });
    }
    dianji($("a",".sear2"));
    dianji($("a",".me_showtop"));
    dianji($("a",".lei2_k"));

    $(".sub").click(function(){
        if($(".inp").val()==""){
            window.location="liebiao.html?keyword="+$(".inp").attr("placeholder");
        }else{
            window.location="liebiao.html?keyword="+$(".inp").val();
        }
    });
}

//购物车数字变化
function shul(){
    var arr = [],oli="",oid="",n1= 0,n2= 0,n3=0;
    if($.cookie("shopcar")){
        var ck = $.cookie("shopcar");
        arr=JSON.parse(ck);
        $.get("../data/list_all.json",{},function(data){
            for (var j=0;j<arr.length ;j++) {
                for(var k1 in data){
                    for(var k2 in data[k1]["part"]){
                        if(k2==arr[j].id){
                            oli+=
                                "<li class='clearfix'>" +
                                "<a class='left' href='details.html?id="+k2+"'>" +
                                "<img src='../images/"+data[k1]["part"][k2]["pic"]+"' alt='' />" +
                                "</a>" +
                                "<div class='l_name left'>" +
                                "<a href='details.html?id="+k2+"'>"+data[k1]["part"][k2]["name"]+"</a>" +
                                "<span><b>"+data[k1]["part"][k2]["kg"]+"</b>kg</span>" +
                                "</div>" +
                                "<div class='l_shan right'>" +
                                "<span class='l_jge'>￥<b>"+data[k1]["part"][k2]["price"]+"</b></span>" +
                                "<span class='l_num'>×<b>"+arr[j].num+"</b></span>" +
                                "<a class='l_del' data-id='"+k2+"' href='javascript:'>删除</a>" +
                                "</div>" +
                                "</li>";
                        }
                    }
                }
            }
            $(".gwclist").html(oli);
            minigwc(arr,n1,n2,n3);
        },"json");
    }
}
function minigwc(arr,n1,n2,n3){
    if(arr.length!=0){
        $(".gwcno").hide();
        $(".gwchave").show();
    }else{
        $(".gwcno").show();
        $(".gwchave").hide();
    }
    for(var f=0;f<arr.length;f++){
        n1+= Number($("b",".l_jge").eq(f).text()) * Number($("b",".l_num").eq(f).text());
        n2+= Number($("b",".l_name").eq(f).text()) * Number($("b",".l_num").eq(f).text());
        n3+= parseInt(arr[f].num);
    }
    //重量、数量、金额计算
    $("b",".z_je").text("￥"+n1);
    $("b",".z_zl").text(n2.toFixed(2));
    $("b",".z_num").text(n3);
    $("span",".gwc").text(n3);
    $(".num").text(n3);
    //单个删除
    $(".l_del").click(function(){
        $(this).parents("li").remove();
        oid=$(this).attr("data-id");
        cookie(oid,0);
        shul();
    });
}
//cookie存取
function cookie(that,a){
    var arr = [];
    var value="";
    var ojson = {
        "id":that,
        "num":a
    };
    if($.cookie("shopcar")){
        var ck = $.cookie("shopcar");
        arr=JSON.parse(ck);
        for (var j=0;j<arr.length ;j++) {
            if (arr[j].id == ojson.id) {
                if(ojson.num==0){
                    arr.splice(j,1);
                }else{
                    arr[j].num=a;
                }
                break;
            }
        }
        value = JSON.stringify(arr);
        $.cookie("shopcar", value, {"path": "/"});
    }
}
$(function(){
    $.get("../data/menu.json",{},function(data){
        menu(data);
        golieb();
    },"json");
    city();
    login();
    fnpost();
    shul();
});