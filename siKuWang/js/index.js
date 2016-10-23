/**
 * Created by Administrator on 2016/8/23.
 */

//注册成功后登录变成用户名
$(function(){
    var oCk=document.cookie.split("; "),oCk1=[];
    for(var m=0;m<oCk.length;m++){
        if(oCk[m].match(/^(name)(.){1,}(mima)$/g)){
            oCk1.push(oCk[m].match(/^(name)(.){1,}(mima)$/g));
        }
    }
    if(oCk1!=""){
        if(oCk1[0][0].split("=")[0].split("name")[1]!=undefined){
            $(".ljlogin").attr("href","../index.html");
            $("#login").html("您好,"+oCk1[0][0].split("=")[0].split("name")[1])
        }
    }


});


//json动态创建菜单
$(function(){
    $.ajax({
        type: "get",
        url: "data/menu.json",
        success: function (data) {
            var oJson = window.eval(data);
            var oLi="";
            //在ul中创建li
            for(var k1 in oJson){
                oLi+="<li><span class='spana'><a href=\""+oJson[k1]["url"]+"\">"+oJson[k1]["name"]+"</a></span>";
                for(var k2 in oJson[k1]["lei"]){
                    oLi+="<a class='leia' href=\""+oJson[k1]["lei"][k2]["url"]+"\">"+oJson[k1]["lei"][k2]["name"]+"</a>";
                }
                oLi+="<div class='show'></div></li>";
                $(".all").html(oLi);
            }
            //li奇偶行颜色
            $(".all li:even").css({"background":"#463b7f"});
            $(".all li:odd").css({"background":"#382f6b"});
            //菜单定位：上对齐与下对齐
            $(".show:lt(3)").css({"top":"-2px"});
            for(var i=0;i<6;i++){
                (function(i){
                    $(".show:gt(2)").eq(i).css({"bottom":-2-(5-i)*62+"px"});
                })(i);
            }
            //划过时菜单中写入内容
            for(var n=0;n<9;n++){
                (function(n){
                    oLi="";
                    for(var k3 in oJson["a0"+n]["part"]){
                        oLi+="<div><span>"+oJson["a0"+n]["part"][k3]["name"]+"</span>";
                        for(var k4 in oJson["a0"+n]["part"][k3]["part"]){
                            oLi+="<a class='showa' href=\""+oJson["a0"+n]["part"][k3]["part"][k4]["url"]+"\">"+oJson["a0"+n]["part"][k3]["part"][k4]["name"]+"</a><i></i>";
                        }
                        oLi+="</div>";
                    }
                    for(var k5 in oJson["a0"+n]["tuisong"]){
                        oLi+="<a class='tuisong' href=\""+oJson["a0"+n]["tuisong"][k5]["url"]+"\">"+oJson["a0"+n]["tuisong"][k5]["name"]+"</a>";
                    }
                    $(".show").eq(n).html(oLi);
                    //划入时li中元素的变化
                    $(".all li").eq(n).mouseenter(function(){
                        $(".all li").eq(n).css({"background":"#fff","border-left":"2px solid #382f6b","padding-left":"18px"});
                        $(".all li:eq("+n+") a").css({"color":"#000"});
                        $(".all li:eq("+n+") .spana a").css({"color":"#382f6b"});
                        $(".show").eq(n).css("display","block");
                        $(".tuisong").css("color","#fff");
                        $(".leia").mouseenter(function(){$(this).css({"color":"#e93b39"})})
                        $(".leia").mouseleave(function(){$(this).css({"color":"#000"})})
                        $(".showa").mouseenter(function(){$(this).css({"color":"#e93b39"})})
                        $(".showa").mouseleave(function(){$(this).css({"color":"#000"})})
                    });
                    //划出时li中元素的变化
                    $(".all li").eq(n).mouseleave(function(){
                        $(".show").eq(n).css("display","none");
                        $(".all li:eq("+n+") a").css({"color":"#ccc"});
                        $(".all li:eq("+n+") .spana a").css({"color":"#fff"});
                    });
                    //划出时奇偶数li背景的恢复
                    $(".all li:even").mouseleave(function(){
                        $(".all li:even").css({"background":"#463b7f"});
                    });
                    $(".all li:odd").mouseleave(function(){
                        $(".all li:odd").css({"background":"#382f6b"});
                    });
                })(n);
            }
        }
    });
});

//轮播图
$(document).ready(function(){
    var i=1;
    var timer=0;
    var arr=["#000","#cc8c9a","#ead9cf"];
    function bh() {
        window.clearTimeout(timer);
        $(".t1").css({display:"none",left:"-20px"});
        $(".con1").css({display:"none",right:"-20px"});
        $(".t1").attr("src", "images/bg" + i + ".jpg");
        $(".con1").attr("src", "images/tex" + i + ".png");
        dot();
        $(".box1").fadeIn(400, function () {
            $(".box1").css({"background":arr[i-1]});
        });
        $(".t1").fadeIn(400, function () {
            $(".t1").animate({left: "0px"}, 1500, function () {});
        });
        $(".con1").fadeIn(400, function () {
            $(".con1").animate({right: "0px"}, 1500, function () {
                i==3?i=1:i++;
                timer=setTimeout(bh,2000);
            });
        });
    }
    bh();
    //轮播下小圆点变换背景色
    function dot(){
        for(var n=0;n<3;n++){
            if(n==(i-1)){
                $(".lunbo span:eq("+n+")").css({background:"#382f6b",opacity:1});
            }else{
                $(".lunbo span:eq("+n+")").css({background:"#999",opacity:0.7});
            }
        }
    }
    //轮播小圆点点击事件
    function oCLick(){
        for(var j=0;j<3;j++){
            (function (j) {
                $(".lunbo span:eq("+j+")").click(function(){
                    i=j+1;
                    $(".t1").stop();//停止当前的动画，避免在上一个动画未完成之前开始下一个动画
                    $(".con1").stop();
                    bh();
                });
            })(j);
        }
    }
    oCLick();
    //轮播左右按钮的淡入淡出
    $(".lunbo").mouseenter(function(){
        $(".lunbo i").fadeIn(250);
    });
    $(".lunbo").mouseleave(function(){
        $(".lunbo i").fadeOut(250);
    });
    function butClick(){
        $(".butl").click(function(){
            i=i-1;
            if(i==0){i=3}
            $(".t1").stop();//停止当前的动画，避免在上一个动画未完成之前开始下一个动画
            $(".con1").stop();
            bh();
        });
        $(".butr").click(function(){
            i=i+1;
            if(i==4){i=1}
            $(".t1").stop();//停止当前的动画，避免在上一个动画未完成之前开始下一个动画
            $(".con1").stop();
            bh();
        });
    }
    butClick();
});

$(function(){
    //品牌展示左移出现折扣效果
    $(".border").mouseenter(function(){
        $(this).animate({left:"-80"},150);
        $(this).mouseleave(function(){
            $(this).animate({left:"0"},100,function(){$(".border").finish();});
        });
    });
    //倒计时
    var _date= 0,timer=0,a= 0,b= 0,c= 0,d= 0,e=0;
    function djs(){
        _date=new Date("2016/09/08")-new Date();
        a=Math.floor(_date/1000);
        b=a%60;
        c=(a-b)/60%60;
        d=(a-b-c*60)/60/60%24;
        e=(a-b-c*60-d*3600)/60/60/24;
        $(".tia").html(e);
        $(".shi").html(d);
        $(".fen").html(c);
        $(".mia").html(b);
        timer=window.setTimeout(djs,100);
    }
    djs();
    function goup(oThis,oTop){
        $("span",oThis).stop();
        $("span",oThis).finish();
            $("span",oThis).animate({top:0},200);
            $(oThis).mouseleave(function(){
                $("span",oThis).animate({top:oTop},10,function(){});
            });
    }
    $(".man a").mouseenter(function(){goup(this,189)});


});
//用json写的商城
$(document).ready(function(){
    $.ajax({
        type:"get",
        url:"data/floor.json",
        success:function(data){
            var oJson=window.eval(data);
            var oDiv="";
            for(var i=0;i<12;i++) {
                oDiv="";
                (function (i) {
                    for(var k1 in oJson["100"+i]["part"]){
                        oDiv+="<a href=\""+oJson["100"+i]["part"][k1]["url"]+"\">"+oJson["100"+i]["part"][k1]["name"]+"</a>";
                    }
                    oDiv+="<a class='more4' href=\""+oJson["100"+i]["more"]["url"]+"\">"+oJson["100"+i]["more"]["name"]+"</a></div><div class='sele'>";
                    for(var k2 in oJson["100"+i]["selection"]){
                        oDiv+="<a class=\"s"+[k2]+"\" href=\""+oJson["100"+i]["selection"][k2]["url"]+"\"><img src=\"images/"+oJson["100"+i]["selection"][k2]["path"]+"\"/><h3>"+oJson["100"+i]["selection"][k2]["name"]+"</h3><h4>"+oJson["100"+i]["selection"][k2]["sift"]+"</h4></a>";
                    }
                    $(".sort").eq(i).html("<div class=\"title\"><a class='variety' href=\""+oJson["100"+i]["sort"]["url"]+"\">"+oJson["100"+i]["sort"]["name"]+"</a>"+oDiv+"</div>");
                })(i);
            }
        }
    });
    //图片划过透明变化效果
    function toum(othis){
        $(othis).animate({"opacity":"0.8","filter:alpha(opacity=)":"80"},400,function(){
            $(othis).animate({"opacity":"1","filter:alpha(opacity=)":"100"},200);
        });
    }
    $(".floor").on("mouseenter",".sele img",function(){toum(this)});
    $(".pic3").on("mouseenter","img",function(){toum(this)});
    //$(".sale1").on("mouseenter","img",function(){toum(this)});
    $(".baodai").on("mouseenter","img",function(){toum(this)});

    //图片划过跳动效果
    function bda(othis){
        $(othis).animate({"margin-top":"-5"},250,function(){
            $(othis).animate({"margin-top":"0"},100);
        });
    }
    $(".xiebao").on("mouseenter","img",function(){bda(this)});

});
//猜你喜欢，轮播图
$(function(){
    var _left=-230;
    function leftjian(){
        $(".showpic").delay(2000).animate({
            "left":_left
        },500,function(){
            _left=_left-230;
            if(_left<=-3220){
                $(".showpic").css({left:"0"});
                _left=-230;
            }
            leftjian();
        });
    }
    leftjian();
});
//滚轮出现固定搜索框
$(function(){
   $(window).scroll(function(){
       if($(window).scrollTop()>800){
           $(".gusearch").fadeIn(300);
       }else{
           $(".gusearch").css({"display":"none"});
       }
   });
});
$(function(){
    //楼梯的淡入淡出
    $(window).scroll(function(){
        if($(window).scrollTop()>550){
            $(".gufloor").fadeIn(500);
        }else{
            $(".gufloor").fadeOut(500);
        }
    });
    //楼层点击回到指定楼层
    for(var i=0;i<3;i++){
        (function(i){
            $(".gufloor a").eq(i).click(function(){
                $("html,body").animate({scrollTop:(730+i*700)}, 300);
            });
        })(i);
    }
    $(".gufloor a").eq(3).click(function(){
        $("html,body").animate({scrollTop:2680}, 300);
    });
    for(var i=4;i<$(".gufloor a").length;i++){
        (function(i){
            $(".gufloor a").eq(i).click(function(){
                $("html,body").animate({scrollTop:(1610+i*390)}, 300);
            });
        })(i);
    }
    //回到顶部
    $(".gufloor span").click(function(){
        $("html,body").animate({scrollTop:0},500);
    });
})

























