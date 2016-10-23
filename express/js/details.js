/**
 * Created by Administrator on 2016/10/11.
 */

function details(data,pid1){
    for(var k1 in data){
        for(var k2 in data[k1]["part"]){
            if(k2==pid1){
                shuju(data[k1]["name"],data[k1]["part"][k2],pid1);
            }
        }
    }
    function shuju(name,ojson,pid1){
        var oli="",oimg="";
        //添加放大镜头部数据
        $(".d_top").html("<h2>"+name+"</h2><span> > "+ojson["name"]+"</span>");
        //添加放大镜图片数据
        for(var i=0;i<ojson["img"].length;i++){
            oli+="<li><img src='../images/img/"+ojson["img"][i]+"' alt=''/></li>";
        }
        $(".minipic").html(oli);
        $(".bigimg").attr("src",$("img",".minipic").eq(0).attr("src"));
        $(".showpic img").attr("src",$(".bigimg").attr("src"));
        //添加放大镜右侧信息
        $(".ziyin").text(ojson["ziying"]);
        if($(".ziyin").html()==""){
            $(".ziyin").css({"display":"none"});
        }
        $(".name1").text(ojson["name"]);
        $(".cuxiao").text(ojson["cuxiao"]);
        $("b",".price").text(ojson["price"]);
        if(ojson["zengp"]!=""){$("b",".cuxxx").html("<span class='maiz'>买赠</span>"+ojson["zengp"]);}
        $(".xinxi").html(
            "<li>品牌："+ojson["pinpai"]+"</li>"+
            "<li>产地："+ojson["chandi"]+"</li>"+
            "<li>规格："+ojson["guige"]+"</li>"+
            "<li>重量："+ojson["kg"]+"kg</li>"+
            "<li>产品编号："+pid1+"</li>"
        );
        //添加展示图片
        for(var i=0;i<ojson["xqimg"].length;i++){
            oimg+="<img src='../images/img/"+ojson["xqimg"][i]+"' alt='图片'/> ";
        }
        $(".jiepic").html(oimg);
        $(".pingj").html("<img src='../images/img/"+ojson["pjiapic"]+"' alt='图片'/>");
        //加入购物车添加data-id
        $(".joincar").attr("data-id",pid1);
    }

    //放大镜小图片滚动
    var n=0;
    function gundong(){
        $(".minipic").stop().animate({
            "margin-top":-61*n
        },500);
    }
    $(".down").click(function(){
        n++;
        if(n>$("li",".minipic").length-5){n=$("li",".minipic").length-5}
        gundong();
    });
    $(".up").click(function(){
        n--;
        if(n<1){n=0}
        gundong();
    });
    //放大镜小图片划过变换
    function small(){
        $(".lempc img:eq(0)").addClass("imgon");
        $("img",".lempc").mouseenter(function(){
            $(this).addClass("imgon");
            $("img",".lempc").not(this).removeClass();
            $(".bigimg").attr("src",$(this).attr("src"));
            $(".showpic img").attr("src",$(".bigimg").attr("src"));
        });
    }
    small();
    //图片放大跟随滑块改变位置
    function fdajing(){
        var oDamo=$(".bigpic"),
            oSimg=$(".bigpic img"),
            oFloat=$(".floatbox"),
            oShow=$(".showpic"),
            oBimg=$(".showpic img"),
            baifen=oShow.width()/oFloat.width(),
            iX="",iY="",MaxX="",MaxY="";
        oDamo.mousemove(function(e){
            $(".showpic").css({"display":"block"});
            $(".floatbox").css({"display":"block"});
            iX = e.pageX - $(this).offset().left - oFloat.width()/2,
                iY = e.pageY - $(this).offset().top - oFloat.height()/2,
                MaxX = oDamo.width()-oFloat.width(),
                MaxY = oDamo.height()-oFloat.height();
            iX = iX > 0 ? iX : 0;
            iX = iX < MaxX ? iX : MaxX;
            iY = iY > 0 ? iY : 0;
            iY = iY < MaxY ? iY : MaxY;
            oFloat.css({left:iX+'px',top:iY+'px'});
            oBimg.css({marginLeft:-baifen*iX+'px',marginTop:-baifen*iY+'px'});
        });
        oDamo.mouseout(function(){
            $(".showpic").css({"display":"none"});
            $(".floatbox").css({"display":"none"});
        });
    }
    fdajing();

    //商品介绍与评价切换
    function qiehuan(){
        $("a",".pDetail").click(function(){
            $(this).addClass("onjie").siblings().not("span").removeClass();
        });
        $("a",".pDetail").eq(0).click(function(){
            $(".jiepic").show();
            $(".fuwu").hide();
            $(".pingj").hide();
        });
        $("a",".pDetail").eq(1).click(function(){
            $(".jiepic").hide();
            $(".fuwu").show();
            $(".pingj").hide();
        });
        $("a",".pDetail").eq(2).click(function(){
            $(".jiepic").hide();
            $(".pingj").show();
            $(".fuwu").hide();
        });
    }
    qiehuan();
    //数量减
    var a=0;
    $(".jian").click(function(){
        a=Number($("input",".jiaj").val());
        if(a>1){
            $("input",".jiaj").val(a-1);
        }else{
            $("input",".jiaj").val(1);
        }
    });
    //数量加
    $(".add").click(function(){
        a=Number($("input",".jiaj").val());
        if(a>=1){
            $("input",".jiaj").val(a+1);
        }else{
            $("input",".jiaj").val(1);
        }
    });
    //输入框数量改变
    $("input",".jiaj").blur(function(){
        if($(this).val()<1){$(this).val(1)}
    });

    //点击加入购物车
    function addcar(id){
        var arr = [];
        var value="";
        var flag = true;
        var ojson = {
            "id":id,
            "num":Number($("input",".jiaj").val())
        };
        if($.cookie("shopcar")){
            var ck = $.cookie("shopcar");
            arr=JSON.parse(ck);
            for (var j=0;j<arr.length ;j++) {
                if (arr[j].id == ojson.id) {
                    arr[j].num=Number(arr[j].num)+ojson.num;
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
        shul();
    }
    $(".joincar").click(function(){
        addcar($(this).attr("data-id"));
        $(".wshopcar").css({"display":"block"});
        $("html").addClass("obody");
        $(".wstop span").click(function(){
            $(".wshopcar").css({"display":"none"});
            $("html").removeClass();
        });
        $(".wsbot i").click(function(){
            $(".wshopcar").css({"display":"none"});
            $("html").removeClass();
        });
    });
    shul();
}




$(function(){
    var id=window.location.search;
    var us1=[],pid1="";
    if(id!=""){
         var pid = id.replace(/[?]/g, "").split("&");
         for (var i = 0; i < pid.length; i++) {
             us1.push(pid[i].split("="));
         }
         for (var n = 0; n < us1.length; n++) {
             if (us1[n][0] == "id") {
                 pid1=us1[n][1];
                 $.get("../data/list_all.json",{},function(data){
                     details(data,pid1);
                 },"json");
             }
         }
    }

});