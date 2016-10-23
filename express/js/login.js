/**
 * Created by Administrator on 2016/10/9.
 */
$(function(){
    $("input",".user").val("");
    $("input",".mima").val("");
    $("input",".yanz").val("");
    //随机验证码
    var attr=[],n1=0,n2=0,n3=0,n4=0;
    function sjma(){
        attr=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        n1=Math.floor(Math.random()*attr.length);
        n2=Math.floor(Math.random()*attr.length);
        n3=Math.floor(Math.random()*attr.length);
        n4=Math.floor(Math.random()*attr.length);
        $(".sjma").text(attr[n1]+attr[n2]+attr[n3]+attr[n4]).click(function(){sjma();});
    }
    sjma();
    //用户名、密码输入改变事件
    function biank(that,n){
        $("input",that).focusin(function(){
            $(this).keyup(function(){
                if($(this).val()==""){
                    $(that).find("i").css({"background":"url(../images/icon"+n+".jpg) no-repeat"});
                }else{
                    $(that).find("i").css({"background":"url(../images/icon.jpg) no-repeat"})
                        .click(function(){
                        $("input",that).val("");
                        $(that).find("i").css({"background":"url(../images/icon"+n+".jpg) no-repeat"});
                    });
                }
            });
            $(that).css({"border-color":"#690"});
            $(that).next("div").text("").css({"border-color":"#fff"});
        }).blur(function(){
            $(that).css({"border-color":"#ccc"});
        });
    }
    biank(".user",1);//用户名输入改变事件
    biank(".mima",2);//密码输入改变事件
    //验证输入改变事件
    function yanz(that){
        $("input",that).focusin(function(){
            $(this).css({"border-color":"#690"});
            $(that).next("div").text("").css({"border-color":"#fff"});
        }).blur(function(){
            $(this).css({"border-color":"#ccc"});
        });
    }
    yanz(".yanz");
    //用户名验证
    function user(){
        if($("input",".user").val()==""){
            $(".user").css({"border-color":"red"});
            $(".tis1").css({"border-color":"red","color":"red"}).text("请输入用户名");
        }else{
            $(".user").css({"border-color":"#ccc"});
            $(".tis1").css({"border-color":"#fff"}).text("");
            yzma();
        }
    }
    //验证码验证
    function yzma(){
        if($("input",".yanz").val()==""){
            $("input",".yanz").css({"border-color":"red"});
            $(".tis3").css({"border-color":"red","color":"red"}).text("请输入验证码");
        }else if($("input",".yanz").val().toLowerCase()==$(".sjma").text().toLowerCase()){
            $("input",".yanz").css({"border-color":"#ccc"});
            $(".tis3").css({"border-color":"#fff"}).text("");
            fnsub();
        }else{
            $("input",".yanz").css({"border-color":"red"});
            $(".tis3").css({"border-color":"red","color":"red"}).text("验证码错误");
            $("input",".yanz").val("");
            sjma();
        }
    }
    //用户名和密码验证
    function fnsub(){
        var arr=[],flag=true;
        if($.cookie("username")){
            var ck = $.cookie("username");
            arr=JSON.parse(ck);
            for (var j=0;j<arr.length ;j++) {
                if ($("input",".user").val()==arr[j].name && $("input",".mima").val()==arr[j].mima) {
                    $.cookie("user",$("input",".user").val(),{path:"/"});
                    window.location="../index.html";
                    flag = false;
                    break;
                }
            }
        }
        if(flag){
            $(".tis2").css({"border-color":"red","color":"red"}).text("账户名或密码错误");
            $(".mima").css({"border-color":"red"});
        }
    }
    $(".sub").click(function(){
        user();
    });

});