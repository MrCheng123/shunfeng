/**
 * Created by Administrator on 2016/8/25.
 */
//菜单分类划入显示，划出影藏
$(function() {
    //菜单分类划入显示，划出影藏
    function menushow() {
        $(".all").css({"display": "none"});
        $(".all_luxury").mouseenter(function () {
            $(".all").fadeIn(100);
        });
        $(".all_luxury").mouseleave(function () {
            $(".all").css({"display": "none"});
        });
    }

    menushow();
    //腕表分类显示更多
    function watchmore() {
        $(".mi2").css({display: "none"});
        $(".wshow").css({display: "block"});
        $(".open").click(function () {
            $(".mi2").css({display: "block"});
            $(".open").css({display: "none"});
            $(".clos").css({display: "block"});
        });
        $(".clos").click(function () {
            $(".mi2").css({display: "none"});
            $(".wshow").css({display: "block"});
            $(".open").css({display: "block"});
            $(".clos").css({display: "none"});
        });
    }

    watchmore();
    //综合，人气，新品，销量划过效果
    function zrxx() {
        $(".cho1 a").mouseenter(function () {
            $(this).children("i").css({"background": "url(\"../images/search_icon3.png\") no-repeat 0 -206px"});
        });
        $(".cho1 a").mouseleave(function () {
            $(this).children("i").css({"background": "url(\"../images/search_icon3.png\") no-repeat 0 -186px"});
        });
    }

    zrxx();



//ajax请求josn获取商品列表
    function watchall(){
        $.ajax({
            type:"get",
            url:"../data/watch.json",
            success:function(data){
                var oJson=window.eval(data);
                var oDiv = "";
                for(var k1 in oJson){
                    //oDiv="";
                    oDiv+="<dl class='thewatch' id=\""+k1+"\">" +

                        "<dt class='d0'><a href=\""+oJson[k1]["url"]+"\"><img src=\"../images/"+oJson[k1]["pic"]+"\" alt=\"\"/></a></dt>" +
                        "<dd class='d1'></dd>" +
                        "<dd class='d2'><a href=\""+oJson[k1]["url"]+"\">"+oJson[k1]["name"]+"</a></dd>" +
                        "<dd class='d3'>￥ "+oJson[k1]["price"]+"</dd>" +
                        "<dd class='d4'><a href=\"javascript:;\">加入购物车</a><i></i><span>收藏</span></dd>" +

                        "</dl>";
                }
                $(".allwatch").html(oDiv);
                //数量小于5的商品特别提示
                function litter(){
                    for(var k2 in oJson){
                        if(oJson[k2]["pcs"]<=5){
                            $(".d4 i","#"+k2).html("仅剩"+oJson[k2]["pcs"]+"件");
                        }
                        if(oJson[k2]["fsales"]==1){
                            $(".d0","#"+k2).append("<i class='sg' href='#'></i>");
                        }
                        if(oJson[k2]["field"]!=""){
                            $(".d1","#"+k2).append("<i>"+oJson[k2]["field"]+"</i>");
                        }
                        if(oJson[k2]["active1"]!=""){
                            $(".d1","#"+k2).append("<span>"+oJson[k2]["active1"]+"</span>");
                        }
                        if(oJson[k2]["active2"]!=""){
                            $(".d1","#"+k2).append("<span>"+oJson[k2]["active2"]+"</span>");
                        }
                        if(oJson[k2]["active3"]!=""){
                            $(".d1","#"+k2).append("<span>"+oJson[k2]["active3"]+"</span>");
                        }
                    }
                }
                litter();

                //单个商品划过效果
                function thewatch(){
                    $(".allwatch").on("mouseenter",".thewatch",function(){
                        //alert("ok");
                        $(this).css({"border-color":"#ccc"});
                        $(".d4",this).css({"display":"block"});
                        $(this).mouseleave(function(){
                            $(this).css({"border-color":"#fff"});
                            $(".d4",this).css({"display":"none"});
                        });
                    });

                }
                thewatch();
                //添加购物车事件
                function joincar(){
                    $(".allwatch").on("click",".d4 a",function(){
                        $(".wshopcar").css({"display":"block"});
                    });
                    $(".wstop span").click(function(){
                        $(".wshopcar").css({"display":"none"});
                    });
                    $(".wsbot i").click(function(){
                        $(".wshopcar").css({"display":"none"});
                    });
                }
                joincar();
            }
        });
    }
    watchall();


});




