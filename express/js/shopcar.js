/**
 * Created by Administrator on 2016/10/10.
 */


function fncreat(oJson){
    var arr=[],ck="",oTr="";
    if($.cookie("shopcar")){
        ck = $.cookie("shopcar");
        arr=JSON.parse(ck);
        for (var j=0;j<arr.length ;j++) {
            for(var k1 in oJson){
                console.log(k1)
                for(var k2 in oJson[k1]["part"]){
                    if(k2==arr[j].id){
                        oTr+="<tr class='"+k2+"'>" +
                            "<td><input class='chec' type='checkbox' checked=\"checked\"/></td>" +
                            "<td class='namee'><a class='theName' href='#'><img src=\"../images/"+oJson[k1]["part"][k2]["pic"]+"\" alt=''/>"+oJson[k1]["part"][k2]["name"]+"</a></td>" +
                            "<td class='td3'>￥<i>"+oJson[k1]["part"][k2]["price"]+"</i></td>" +
                            "<td></td>"+
                            "<td class='td5'>" +
                            "<i class='jian left'>-</i><input class='num1 left' type=\"text\" value=\""+arr[j].num+"\"/><i class='jia left'>+</i>" +
                            "</td>" +
                            "<td class='td6'><i>"+oJson[k1]["part"][k2]["kg"]+"</i>kg</td>"+
                            "<td class='td7'>￥<b></b></td>" +
                            "<td>现货</td>"+
                            "<td class='td9'><a href=\"javascript:;\">删除</a></td>" +
                            "</tr>";
                    }
                }
            }
        }
        $(".mything").html(oTr);
    }
}

function fnCar(){
    var jiage= 0,shul= 0,a= 0,oid="";
    for(var n=0;n<$("tr",".mything").length;n++){
        dyong($("tr",".mything").eq(n));
    }
    //改变金额小计的值
    function dyong(oThis){
        $(".td7 b",oThis).html( $(".td3 i",oThis).html() * $(".num1",oThis).val() );
        zongji();
    }
    //价格总计
    function zongji(){
        jiage=0; shul=0;
        for(var i=0;i<$("tr",".mything").length;i++){
            if($(".chec",$("tr",".mything")[i]).prop("checked")){
                jiage+=Number($("b",".td7").eq(i).html());
                shul+=Number($("i",".td6").eq(i).html()*$(".num1").eq(i).val());
            }
        }
        $(".spzj").html("￥"+jiage);
        $(".z_num").html(shul.toFixed(2));
    }
    //数量减
    $(".jian").click(function(){
        a=Number($(this).next(".num1").val());
        if(a>1){
            $(this).next(".num1").val(a-1);
        }else{
            $(this).next(".num1").val(1);
        }
        a=$(this).next(".num1").val();
        dyong($(this).parents("tr"));
        oid=$(this).parents("tr").prop("class");
        cookie(oid,a);
    });
    //数量加
    $(".jia").click(function(){
        a=Number($(this).prev(".num1").val());
        if(a>=1){
            $(this).prev(".num1").val(a+1);

        }else{
            $(this).prev(".num1").val(1);
        }
        a=$(this).prev(".num1").val();
        dyong($(this).parents("tr"));
        oid=$(this).parents("tr").prop("class");
        cookie(oid,a);
    });
    //输入框数量改变
    $(".num1").blur(function(){
        if($(this).val()<1){$(this).val(1)}
        dyong($(this).parents("tr"));
        a=$(this).val();
        oid=$(this).parents("tr").prop("class");
        cookie(oid,a);
    });
    //全选单选事件
    function qxuan() {
        $(":checkbox").prop("checked",true);
        $(".choseAll").click(function () {
            if ($(this).prop("checked") == true) {
                $(".chec").prop("checked", true);
                zongji();
            }else{
                $(".chec").prop("checked", false);
                zongji();
            }
        });
        $(".chec").click(function () {
            if ($(".chec:checked").length == $(".chec").length) {
                $(".choseAll").prop("checked", true);
            } else {
                $(".choseAll").prop("checked", false);
            }
            zongji();
        });
    }
    qxuan();
    //单个删除
    $("a",".td9").click(function(){
        $(this).parents("tr").remove();
        oid=$(this).parents("tr").prop("class");
        zongji();
        cookie(oid,0);
        fnnone();
    });
    //删除选中商品
    $(".del").click(function(){
        for(var m=$(".chec:checked").length-1;m>=0;m--){//此处必须为m--,倒序删除，否则出现bug
            oid=$(".chec:checked").eq(m).parents("tr").prop("class");
            $(".chec:checked").eq(m).parents("tr").remove();
            cookie(oid,0);
        }
        fnnone();
        zongji();
    });
    //清空购物车
    $(".qkong").click(function(){
        $(".shop").remove();
        $(".nothing").css({"display":"block"});
        $.cookie("shopcar",null,{path:"/"});
    });
    //购物车没有商品
    function fnnone(){
        if($(".mything tr").length==0){
            $(".shop").css({"display":"none"});
            $(".nothing").css({"display":"block"});
        }
    }
    fnnone();
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
}




$(function(){
    $.get("../data/list_all.json",{},function(data){
        var oJson = JSON.parse(data);
        fncreat(oJson);
        fnCar();
    },"text");
});


