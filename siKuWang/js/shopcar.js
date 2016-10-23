/**
 * Created by Administrator on 2016/8/26.
 */



//获取cookie创建购物车物品详情

function shopcar(oJson){
    var _cookie=document.cookie;
    var ck1=_cookie.split("; ");
    var ck2=[];
    for(var m=0;m<ck1.length;m++){
        if(ck1[m].match(/(w0)(\d){1,}(=)(\d){1,}/g)){
            ck2.push(ck1[m].match(/(w0)(\d){1,}(=)(\d){1,}/g));
        }
    }
    var key="";
    var oTr="";
    if(ck2.length!=0){
        $(".noone").css({"display":"none"});
        $(".mycar").css({"display":"block"});
        for(var i=0;i<ck2.length;i++){
            key=ck2[i][0].split("=")[0];
            oTr+="<tr class='"+key+"'>" +
                    "<td><input class='chec' type='checkbox' checked=\"checked\"/></td>" +
                    "<td><a class='theName' href=\""+oJson[key]["url"]+"\"><img src=\"../images/"+oJson[key]["pic"]+"\" alt=''/>"+oJson[key]["name"]+"</a></td>" +
                    "<td>中国大陆</td>" +
                    "<td class='td4'>￥<i>"+oJson[key]["price"]+"</i></td>" +
                    "<td class='td5'><i class='jian'>-</i><input class='num' type=\"text\" value=\""+ck1[i].split("=")[1]+"\"/><i class='jia'>+</i></td>" +
                    "<td class='td6'><i>￥<b></b>元</i><span>返利<a>88</a>库币</span></td>" +
                    "<td class='td7'><a href=\"javascript:;\">删除</a></td>" +
                "</tr>";
        }
        $(".myall").html(oTr);
    }else{
        $(".mycar").css({"display":"none"});
    }
}
//购物车删除事件
function deleteTr(){
    var trname="";
    var _cookie="",ck1="",a="",reg="";
    $(".td7 a").click(function(){
        $(this).parents("tr").detach();
        trname=$(this).parents("tr").attr("class");
        $.cookie(trname,null);
        if($(".myall tr")[0]==undefined){
            $(".mycar").css({"display":"none"});
            $(".noone").css({"display":"block"});
        }
        add();
    });
}
//购物车数量加减事件
function add(oJson){
    var a="",b="";
    //数量减
    $(".jian",".td5").click(function(){
        var a=Number($(this).next(".num").val());
        if(a>1){
            $(this).next(".num").val(a-1);

        }else{
            $(this).next(".num").val(1);
        }
        $.cookie($(this).parents("tr").attr("class"),$(this).next(".num").val());
        dyong(this);
    });
    //数量加
    $(".jia",".td5").click(function(){
        var a=Number($(this).prev(".num").val());
        if(a>=1){
            $(this).prev(".num").val(a+1);

        }else{
            $(this).prev(".num").val(1);
        }
        $.cookie($(this).parents("tr").attr("class"),$(this).prev(".num").val())
        dyong(this);
    });
    //输入框失去焦点
    $(".num").blur(function(){
        $.cookie($(this).parents("tr").attr("class"),$(this).val());
        dyong(this);
    });
    //价格动态计算
    function dyong(oThis){
        $(".td6 b",$(oThis).parents("tr")).html(($(".td4 i",$(oThis).parents("tr")).html())*($(".td5 .num",$(oThis).parents("tr")).val()));
        xuanz();

    }
    //页面刷新自动计算
    for(var n=0;n<$(".theName").length;n++){
        dyong($(".theName:eq("+n+")"));
    }

}
//选中状态价格相加
function xuanz(){
    var allzj=0;
    for(var j=0;j<$(".myall tr").length;j++){
        if($(".chec",$(".myall tr")[j]).prop("checked")){
            allzj+=Number($(".td6 b",$(".myall tr")[j]).html());
        }
    }
    $(".zjmoney i").html(allzj);
//选中商品数量相加
    allzj=0;
    for(var k=0;k<$(".myall tr").length;k++){
        if($(".chec",$(".myall tr")[k]).prop("checked")){
            allzj+=Number($(".num",$(".myall tr")[k]).val());
        }
    }
    $(".xze p i").html(allzj);
    //选中包装数量相加
    $(".zjbz p i").html(allzj);
//选中库币相加
    allzj=0;
    for(var f=0;f<$(".myall tr").length;f++){
        if($(".chec",$(".myall tr")[f]).prop("checked")){
            allzj+=Number($(".td6 a",$(".myall tr")[f]).html());
        }
    }
    $(".zjkb p i").html(allzj);
}
//复选框勾选事件
function gouxuan(){
    //页面刷新默认全选中
    if($(".choseAll").prop("checked")==false){
        $(".choseAll").prop("checked",true);
    }
    //子选框点击与全选相关事件
    $(".chec").click(function(){
        if($(".chec:checked").length==$(".chec").length){
            $(".choseAll").prop("checked",true);
        }else{
            $(".choseAll").prop("checked",false);
        }
        xuanz();
    });
    //全选事件
    $(".choseAll").click(function(){
        if($(this).prop("checked")){
            $(".chec").prop("checked",true);
            $(".choseAll").prop("checked",true);
            xuanz();
        }
        if($(this).prop("checked")==false){
            $(".chec").prop("checked",false);
            $(".choseAll").prop("checked",false);
            xuanz();
        }
    });
    //勾选删除事件
    $(".xze a").click(function(){
        var lsname="";
        for(var m=$(".chec:checked").length-1;m>=0;m--){
            lsname=$(".chec:checked").eq(m).parents("tr").prop("class");
            $.cookie(lsname,null);
            $(".chec:checked").eq(m).parents("tr").detach();
        }
        if($(".myall tr").length==0){
            $(".mycar").css({"display":"none"});
            $(".noone").css({"display":"block"});
        }
    });
}

$(function(){
    $.get("../data/watch.json",{},function(data){
        var oJson = JSON.parse(data);
        shopcar(oJson);
        deleteTr();
        add(oJson);
        gouxuan();
    },"text");
});

































