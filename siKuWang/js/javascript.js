
/**
 * Created by Administrator on 2016/8/25.
 */
$(function(){
    $.ajax({
        type: "get",
        url: "../data/menu.json",
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


