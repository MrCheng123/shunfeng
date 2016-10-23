/**
 * Created by Administrator on 2016/10/8.
 */
$(function(){
    $(".biank>i").hide();
    $("input",".username").val("");
    $("input",".yanzm").val("");
    //随机验证码
    var attr=[],n1=0,n2=0,n3=0,n4=0;
    function sjma(){
        attr=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        n1=Math.floor(Math.random()*attr.length);
        n2=Math.floor(Math.random()*attr.length);
        n3=Math.floor(Math.random()*attr.length);
        n4=Math.floor(Math.random()*attr.length);
        $(".sjma").text(attr[n1]+attr[n2]+attr[n3]+attr[n4]).click(function(){sjma();});
        $("a",".next").click(function(){sjma();});
    }
    sjma();
    //用户名验证
    var user="",mima1="",yanz="";
    var panduan=[0,0,0,0,0];
    var reg=/^[1][3578][0-9]{9}$/;
    function fnUser(){
        user=$("input",".username").val();
        if(reg.test(user)){
            $(".biank",".username").css({"border-color":"#ddd"});
            $("i",".username").show();
            $(".tis1").hide();
            return panduan[0]=1;
        }else if(user==""){
            $(".biank",".username").css({"border-color":"#ddd"});
            $("i",".username").hide();
            $(".tis1").hide();
        }else{
            $(".biank",".username").css({"border-color":"red"});
            $("i",".username").hide();
            $(".tis1").text("请输入正确的手机号").css({color:"red"}).show();
        }
    }
    //密码验证
    function fnMima(){
        mima1=$("input",".mima").val();
        if((/^[a-zA-Z0-9_]{6,22}$/).test(mima1)){
            $(".biank",".mima").css({"border-color":"#ddd"});
            $("i",".mima").show();
            $(".tis2").hide();
            return panduan[1]=1;
        }else if(mima1==""){
            $(".biank",".mima").css({"border-color":"#ddd"});
            $("i",".mima").hide();
            $(".tis2").hide();
        }else{
            $(".biank",".mima").css({"border-color":"red"});
            $("i",".mima").hide();
            $(".tis2").text("密码只能为6-20位字母数字下划线组合")
                      .css({"line-height":"36px",color:"red"}).show();
        }
    }
    //密码强度判断
    function mimaqd(){
        mima1=$("input",".mima").val();
        if(mima1.length>5 && mima1.match(/[a-zA-Z]/g)==null && mima1.match(/[_]/g)==null){
            $(".mi_r").css({"background":"red"});
            $(".mi_z").css({"background":"#bbb"});
            $(".mi_q").css({"background":"#bbb"});
        }else if(mima1.length>5 && mima1.match(/[a-zA-Z]/g)!=null && mima1.match(/[_]/g)==null){
            $(".mi_r").css({"background":"#fa9600"});
            $(".mi_z").css({"background":"#fa9600"});
            $(".mi_q").css({"background":"#bbb"});
        }else if(mima1.length>5 && mima1.match(/[a-zA-Z]/g)!=null && mima1.match(/[_]/g)!=null){
            $(".mi_r").css({"background":"#690"});
            $(".mi_z").css({"background":"#690"});
            $(".mi_q").css({"background":"#690"});
        }else{
            $(".mi_r").css({"background":"#bbb"});
            $(".mi_z").css({"background":"#bbb"});
            $(".mi_q").css({"background":"#bbb"});
        }
    }
    //密码确认
    function fnMima1(){
        mima1=$("input",".mima1").val();
        if(mima1==""){
            $(".biank",".mima1").css({"border-color":"#ddd"});
            $("i",".mima1").hide();
            $(".tis3").hide();
        }else if(mima1==$("input",".mima").val()) {
            $(".biank", ".mima1").css({"border-color": "#ddd"});
            $("i", ".mima1").show();
            $(".tis3").hide();
            return panduan[2] = 1;
        }else{
            $(".biank",".mima1").css({"border-color":"red"});
            $("i",".mima1").hide();
            $(".tis3").text("两次输入不一致，请重新输入").css({color:"red"}).show();
        }
    }
    //验证码
    function fnYanz(){
        yanz=$("input",".yanzm").val();
        if(yanz.toLowerCase()==$(".sjma").text().toLowerCase()){
            $(".biank", ".yanzm").css({"border-color": "#ddd"});
            $("i", ".yanzm").show();
            $(".tis4").hide();
            return panduan[3]=1;
        }else if(yanz==""){
            $(".biank",".yanzm").css({"border-color":"#ddd"});
            $("i",".yanzm").hide();
            $(".tis4").hide();
        }else{
            $(".biank",".yanzm").css({"border-color":"red"});
            $("i",".yanzm").hide();
            $(".tis4").text("网络验证码不正确").css({color:"red"}).show();
            $("input",".yanzm").val("");
            sjma();
        }
    }
    //协议勾选
    function fnxieyi(){
        if($("input",".xieyi").prop("checked")==true){
            $(".tis5").hide();
            return panduan[4]=1;
        }else{
            $(".tis5").show().text("请阅读并同意注册协议").css({color:"red"});
        }
    }
    $("input",".username").blur(function(){ fnUser(); });
    $("input",".username").focusin(function(){
        $("i",".username").hide();
        $(".biank",".username").css({"border-color":"#690"});
        $(".tis1").show().text("请输入您的手机号码").css({color:"#666"});
    });
    $("input",".mima").blur(function(){ fnMima(); });
    $("input",".mima").focusin(function(){
        $(this).keyup(function(){mimaqd();});
        $("i",".mima").hide();
        $(".biank",".mima").css({"border-color":"#690"});
        $(".tis2").show().text("6-20位字符，可使用字母、数字、下划线。不建议使用纯数字或字母组合。")
                  .css({"line-height":1.5,"color":"#666"});
    });
    $("input",".mima1").blur(function(){ fnMima1(); });
    $("input",".mima1").focusin(function(){
        $("i",".mima1").hide();
        $(".biank",".mima1").css({"border-color":"#690"});
        $(".tis3").show().text("请再次输入密码").css({"color":"#666"});
    });
    $("input",".yanzm").blur(function(){ fnYanz(); });
    $("input",".yanzm").focusin(function(){
        $("i",".yanzm").hide();
        $(".biank",".yanzm").css({"border-color":"#690"});
        $(".tis4").show().text("请输入验证码").css({"color":"#666"});
    });
    $("input",".xieyi").click(function(){
        fnxieyi();
    });
    //添加到cookie
    function addcookie(){
        var arr = [];
        var value="";
        var flag = true;
        var ojson = {
            "name":user,
            "mima":mima1
        };
        if($.cookie("username")){
            var ck = $.cookie("username");
            arr=JSON.parse(ck);
            for (var j=0;j<arr.length ;j++) {
                if (arr[j].name == ojson.name) {
                    alert("该手机号已被注册，请更换手机号！");
                    window.location=window.location;
                    flag = false;
                    break;
                }
            }
        }
        if(flag){
            arr.push(ojson);
            value = JSON.stringify(arr);
            $.cookie("username", value, {"path": "/"});
            window.location = "login.html";
        }
    }
    $(".ljzc").click(function() {
        panduan = [0, 0, 0];
        fnUser();
        fnMima();
        fnMima1();
        fnYanz();
        fnxieyi();
        if (panduan[0] + panduan[1] + panduan[2] + panduan[3] + panduan[4] == 5) {
            addcookie();

        }
    });
});





