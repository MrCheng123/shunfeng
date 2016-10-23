/**
 * Created by Administrator on 2016/8/27.
 */
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
    //放大镜小图片划过变换
    function small(){
        $(".lempc i:eq(0)").css({"display":"block"});
        $(".lempc a").mouseenter(function(){
            $("i",this).css({"display":"block"});
            $("i",$(".lempc a").not(this)).css({"display":"none"});
            $(".bigimg").attr("src",$("img",this).attr("src"));
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

});