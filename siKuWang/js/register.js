/**
 * Created by Administrator on 2016/8/29.
 */
$(function(){
    function register(){
        var str1="",str2="",str3="";
        var panduan=[0,0,0];
        //用户名验证
        $("input",".yhname1").blur(function () {
            //alert("ok");
            str1=$(this).val();//val获取当前input的值
            var reg=/^[1][3578][0-9]{9}$/;
            if(reg.test(str1)){
                $("b",".yhntop").css({"display":"none"});
                return panduan[0]=1;
            }else if(str1==""){
                $("b",".yhntop").html("请输入您的手机号");
                $("b",".yhntop").css({"color":"red","font-weight":"800"});
                return panduan[0]=0;
            }else{
                $("b",".yhntop").css({"display":"block"});
                $("b",".yhntop").html("请输入正确的手机号！");
                $("b",".yhntop").css({"color":"red","font-weight":"800"});
            }
        });
        //密码验证
        $("input",".yhmima1").blur(function () {
            //alert("ok");
            str2=$(this).val();//val获取当前input的值
            //alert(str.length)
            if(str2==""){
                $("b",".yhmtop").html("请输入密码");
                $("b",".yhmtop").css({"display":"block","color":"red","font-weight":"800"});

            }else if(str2.length<6){
                $("b",".yhmtop").css({"display":"block","color":"red","font-weight":"800"});
                $("b",".yhmtop").html("密码长度不能小于6位");
            }else{
                $("b",".yhmtop").css({"display":"none"});
                return panduan[1]=1;
            }
        });
        //密码确认
        $("input",".yhmima2").focusout(function () {
            str3=$(this).val();//val获取当前input的值
            var oldstr=$(".yhmima1 input").val();
            //alert(str.length)
            if(str3==""){
                $("b",".yhqtop").html("请输入确认密码");
                $("b",".yhqtop").css({"display":"block","color":"red","font-weight":"800"});
            }else if(str3==oldstr){
                $("b",".yhqtop").css({"display":"none"});
                return panduan[2]=1;
            }else{
                $("b",".yhqtop").css({"display":"block","color":"red","font-weight":"800"});
                $("b",".yhqtop").html("确认密码与密码不一致");
            }
        });



        if($(".hezuo input").prop("checked") && panduan[0]==1 && panduan[1]==1 && panduan[2]==1){
            $(".ljzhuce").css({"background":"#f19108"});
            //$(".ljzhuce").attr({"href":"../index.html"});
        }else{
            $(".ljzhuce").css({"background":"#aaa"});
        }
        $(".hezuo input").click(function(){
            if($(".hezuo input").prop("checked") && panduan[0]==1 && panduan[1]==1 && panduan[2]==1){
                $(".ljzhuce").css({"background":"#f19108"});
                $(".ljzhuce").click(function(){
                    document.cookie="name"+str1+"="+str3+"mima;path=/";
                });
                $(".ljzhuce").attr({"href":"login.html"});
            }else{
                $(".ljzhuce").css({"background":"#aaa"});
            }
        });
    }
    register();
});