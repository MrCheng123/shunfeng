/**
 * Created by Administrator on 2016/9/10.
 */
function city(){
    $.ajax({
        url:"data/city.json",
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
                    $(this).attr({"href":"index.html"});
                    $.cookie("send",$(this).text(),{path:"/"});
                });
            }
            xdi($("a",".more_hot"));
            xdi($("a",".shi"));
            //读取cookie写入派送地
            function send(){
                if($.cookie("send")){
                    var sck1=$.cookie("send");
                    console.log(sck1)
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
        $(".login22").html("欢迎您："+$.cookie("user")+" <a class='tuic' style='color: #690' href='html/login.html'>退出</a>");
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
            "<img src=\"images/"+data[k1]["tuisong"]["src"]+"\" alt=\"\"/>" +
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
            $(".xtb",this).css({"background-image":"url(\"images/left_lm_m.png\")"});
            $(this).mouseleave(function(){
                $(".me_show",this).css({"display":"none"});
                $(this).css({"background":"#76ac25"});
                $(".lei1",this).css({"color":"#fff"});
                $(".xtb",this).css({"background-image":"url(\"images/left_lm_m_b.png\")"});
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
            window.location="html/liebiao.html?keyword="+$(this).text();
        });
    }
    dianji($("a",".sear2"));
    dianji($("a",".me_showtop"));
    dianji($("a",".lei2_k"));
    dianji($("a",".floor_ts"));
    $(".sub").click(function(){
        if($(".inp").val()==""){
            window.location="html/liebiao.html?keyword="+$(".inp").attr("placeholder");
        }else{
        window.location="html/liebiao.html?keyword="+$(".inp").val();
        }
    });
}

$(function(){
    $.get("data/menu.json",{},function(data){
        menu(data);
    },"json");
    city();
    login();
    fnpost();
});



//轮播图
function lunbo(oshow,olunbo,opoint,obtl,obtr,oleft) {
    var i = 0;
    var clone = $("a",oshow).first() .clone();//克隆第一张图片
    $(oshow).append(clone);//复制到列表最后
    var size = $("a",oshow).size();
    $("span",opoint).first().addClass("on");
    /*自动轮播*/
    var t = setInterval(function () { i++; move();},3000);
    /*鼠标悬停事件*/
    $(olunbo).hover(function () {
        clearInterval(t);//鼠标悬停时清除定时器
    }, function () {
        t = setInterval(function () { i++; move(); }, 3000); //鼠标移出时清除定时器
    });
    /*鼠标滑入圆点事件*/
    $("span",opoint).hover(function () {
        var index = $(this).index();//获取当前索引值
        i = index;
        $(oshow).stop().animate({ left: -index * oleft }, 500);
        $(this).addClass("on").siblings().removeClass("on");
    });
    /*左右按钮*/
    $(obtl).click(function () {i++;move();});
    $(obtr).click(function () {i--;move();});
    /*滚动事件*/
    function move() {
        if (i == size) {
            $(oshow).css({ left: 0 });
            i = 1;
        }
        if (i == -1) {
            $(oshow).css({ left: -(size - 1) * oleft });
            i = size - 2;
        }
        $(oshow).stop().animate({ left: -i * oleft }, 500);
        if (i == size - 1) {
            $("span",opoint).eq(0).addClass("on").siblings().removeClass("on");
        } else {
            $("span",opoint).eq(i).addClass("on").siblings().removeClass("on");
        }
    }
}
//优选必买
function fnyoux(data){
    var oul1="",oul2="",a=0;
    for(var k1 in data["yxbm"]){
        if(a<4){
            oul1+="<li>" +
                    "<a href='html/details.html?id="+k1+"'>" +
                        "<img src='images/"+data["yxbm"][k1]["pic"]+"' alt=''/>" +
                    "</a>" +
                    "<div class='price_tex'>￥<b>"+data["yxbm"][k1]["price"]+"</b></div>" +
                    "<span class='joincar' data-id='"+k1+"'><i></i>加入购物车</span>" +
                "</li>";
        }
        if(a>3){
            oul2+="<li>" +
                    "<a href='html/details.html?id="+k1+"'>" +
                        "<img src='images/"+data["yxbm"][k1]["pic"]+"' alt=''/>" +
                    "</a>" +
                    "<div class='price_tex'>￥<b>"+data["yxbm"][k1]["price"]+"</b></div>" +
                    "<span class='joincar' data-id='"+k1+"'><i></i>加入购物车</span>" +
                "</li>";
        }
        a++;
    }
    $(".yx1").html(oul1);
    $(".yx2").html(oul2);
    //限时抢购
    oul1="";
    for(var k2 in data["xsqg"]){
        oul1+="<li>" +
                "<a href='html/details.html?id="+k2+"'>" +
                    "<img src='images/"+data["xsqg"][k2]["pic"]+"' alt=''/>" +
                "</a>" +
                "<div class='xsq_tex'>" +
                    "<a href='html/details.html?id="+k2+"'>"+data["xsqg"][k2]["name"]+"</a>" +
                "</div>" +
                "<b>￥"+data["xsqg"][k2]["price"]+"</b>" +
                "<span class='joincar buy_q' data-id='"+k2+"'>抢购</span>" +
            "</li>";
    }
    $(".qgou_bot").html(oul1);
    $(".joincar",".yxbuy_bot").click(function(){
        addcar($(this).attr("data-id"));
        fei($(this).parent());
    });
    $(".joincar",".qgou_l").click(function(){
        addcar($(this).attr("data-id"));
        fei($(this).parent());
    });
}
//获取json生成楼层
function floor(data){
    var oDiv = "";
    for (var k1 in data) {
        oDiv+="<div class='floorer'>" +
                "<a class='ad1' href='#'><img src='images/"+data[k1]["ad1"]["pic"]+"' alt=\"\"/></a>" +
                "<div class='f_main clearfix'>" +
                    "<div class='floor_l left'>" +
                        "<div class='biaoti'>" +
                            "<i></i>" +
                            "<a href='#'>"+data[k1]["name"][0]+"</a>" +
                            "<a href='#'>"+data[k1]["name"][1]+"</a>" +
                        "</div>" +
                        "<a class='ad2' href='#'>" +
                            "<img src='images/"+data[k1]["ad2"]["pic"]+"' alt=\"\"/>" +
                        "</a>" +
                    "</div>" +
                    "<ul class='floor_m clearfix left'>";
                    for(var k2 in data[k1]["part1"]){
        oDiv+=          "<li>" +
                            "<div class='pic1'>" +
                                "<a href='html/details.html?id="+k2+"'>" +
                                    "<img src='images/"+data[k1]["part1"][k2]["pic"]+"' alt=''/>" +
                                "</a>" +
                                "<span class='joincar' data-id='"+k2+"'>加入购物车</span>" +
                            "</div>" +
                            "<div class='xsq_tex1'>" +
                                "<a href='html/details.html?id="+k2+"'>"+data[k1]["part1"][k2]["name"]+"</a>" +
                            "</div>" +
                            "<b>￥"+data[k1]["part1"][k2]["price"]+"</b>" +
                        "</li>";
                    }
        oDiv+=      "</ul>" +
                    "<div class='floor_r right'>" +
                        "<div class='floor_ts'>";
                    for(var i=0;i<9;i++){
        oDiv+=              "<a href='javascript:'>"+data[k1]["part2"][i]+"</a>";
                    }
        oDiv+=          "</div>" +
                        "<a class='ad3' href='#'>" +
                            "<img src='images/"+data[k1]["ad3"]["pic"]+"' alt='' />" +
                            "<span></span>" +
                        "</a>" +
                    "</div>" +
                "</div>" +
            "</div>";
    }
    $(".floor").html(oDiv);
    //楼层颜色
    function fncolor(){
        var arr=["#690","#ff6c00","#d12e49","#f08c18","#78b270","#fa648c","#ad96d9"];
        var arr1=["-97px -296px","-70px -296px","-128px -296px","-156px -296px","-97px -296px","-97px -296px","-97px -296px"];
        for(var i=0;i<$(".f_main").length;i++){
            $(".f_main").eq(i).css({"border-color":arr[i]});
            $(".biaoti").eq(i).css({"background":arr[i]});
            (function(i){
                function fnhover(that){
                    $(that).mouseenter(function(){
                        $(this).css({"background":arr[i],"color":"#fff"});
                        $(this).mouseleave(function(){
                            $(this).css({"background":"#fff","color":"#000"});
                        });
                    });
                }
                fnhover($("a",$(".floor_ts").eq(i)));
                $(".ad3").eq(i).mouseenter(function(){
                    $("span",this).css({"background-position":"-204px -"+(i+1)*33+"px"});
                    $(this).mouseleave(function(){
                        $("span",this).css({"background-position":"-204px 0"});
                    });
                });
            })(i);
            $(".biaoti").find("i").eq(i).css({"background-position":arr1[i]});
        }
    }
    fncolor();
}
function fnshow(that,bot,bot1){
    //加入购物车按钮显示与隐藏
    $(that).mouseenter(function(){
        $(".joincar",this).stop(true,true).animate({"bottom":bot+"px"},300);
        $(this).mouseleave(function(){
            $(".joincar",this).animate({"bottom":bot1+"px"},200);
        });
    });
}
//向上轮播
function fnup(){
    var i=0;
    var t=0;
    function move(){
        if(i>2){
            $(".up_show").css({"margin-top":0});
            i=1;

        }
            $(".up_show").animate({
                "margin-top":-i*128+"px"
            },1000);

    }
    t = setInterval(function () { i++; move();},4000);
}
//点击加入购物车
function addcar(id){
    var arr = [];
    var value="";
    var flag = true;
    var ojson = {
        "id":id,
        "num":1
    };
    if($.cookie("shopcar")){
        var ck = $.cookie("shopcar");
        arr=JSON.parse(ck);
        for (var j=0;j<arr.length ;j++) {
            if (arr[j].id == ojson.id) {
                arr[j].num+=1;
                flag = false;
                break;
            }
        }
    }
    if(flag){
        arr.push(ojson);
    }
    value = JSON.stringify(arr);
    $.cookie("shopcar", value, {"path": "/"});
}
//加入购物车图片飞动效果
function fei(that){
    var cart = $('.gwc');
    var imgtodrag = $(that).find('img').eq(0);
    if (imgtodrag) {
        var imgclone = imgtodrag.clone().offset({
            top: imgtodrag.offset().top,
            left: imgtodrag.offset().left
        }).css({
            'position': 'absolute',
            'height': '150px',
            'width': '150px',
            'z-index': '100'
        }).appendTo($('body')).animate({
            'top': cart.offset().top +20,
            'left': cart.offset().left +10,
            'width': 40,
            'height': 40
        }, 1000);
        setTimeout(function () {
            cart.effect('shake', { times: 2 }, 200);
        }, 1500);
        imgclone.animate({
            'width': 0,
            'height': 0
        }, function () {
            $(this).detach();
            shul();
        });
    }

}
//购物车数字变化
function shul(){
    var arr = [],oli="",oid="",n1= 0,n2= 0,n3=0;
    if($.cookie("shopcar")){
        var ck = $.cookie("shopcar");
        arr=JSON.parse(ck);
        $.get("data/list_all.json",{},function(data){
            for (var j=0;j<arr.length ;j++) {
                for(var k1 in data){
                    for(var k2 in data[k1]["part"]){
                        if(k2==arr[j].id){
                oli+=
                    "<li class='clearfix'>" +
                        "<a class='left' href='html/details.html?id="+k2+"'>" +
                            "<img src='images/"+data[k1]["part"][k2]["pic"]+"' alt='' />" +
                        "</a>" +
                        "<div class='l_name left'>" +
                            "<a href='html/details.html?id="+k2+"'>"+data[k1]["part"][k2]["name"]+"</a>" +
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
function daojishi(){
    //倒计时
    var _date= 0,timer=0,a= "",b= "",c= "",d= "",e="";
    function djs(){
        _date=new Date("2016/10/16")-new Date();
        a=Math.floor(_date/1000);
        b=a%60;
        c=(a-b)/60%60;
        d=(a-b-c*60)/60/60%24;
        e=(a-b-c*60-d*3600)/60/60/24;
        if(d<10){d="0"+d}
        if(c<10){c="0"+c}
        if(b<10){b="0"+b}
        $(".hour").html(String(d).split("")[0]);
        $(".hour1").html(String(d).split("")[1]);
        $(".fen").html(String(c).split("")[0]);
        $(".fen1").html(String(c).split("")[1]);
        $(".miao").html(String(b).split("")[0]);
        $(".miao1").html(String(b).split("")[1]);
        timer=window.setTimeout(djs,100);
    }
    djs();
}
$(function(){
    $.get("data/menu.json",{},function(data){menu(data)},"json");
    lunbo(".show",".lunbo",".point",".btn_l",".btn_r",1000);//主轮播
    $.get("data/xsqgou.json",{},function(data){
        fnyoux(data);
        fnshow($(".yxbuy_bot").find("li"),10,-25);
    },"json");
    $.get("data/floor.json",{},function(data) {
        floor(data);
        fnshow($(".floor_m").find("li"),0,-25);
        $(".joincar",".pic1").click(function(){
            addcar($(this).attr("data-id"));
            fei($(this).parent());
        });
        golieb();

    },"json");
    lunbo(".mn_show",".mini_lunbo",".mn_point",".mn_btl",".mn_btr",170);//mini轮播
    fnup();
    shul();
    daojishi();
});



























