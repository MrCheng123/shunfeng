/**
 * Created by Administrator on 2016/8/29.
 */
$(function(){
    $(".yhname input").blur(function(){
        if($(this).val()==""){
            $(".tishi").css({"display":"block"});
            $(".tishi").html("请输入用户名");
        }else{
            $(".tishi").css({"display":"none"});
        }
    });
    $(".yhmima input").blur(function(){
        if($(this).val()==""){
            $(".tishi").css({"display":"block"});
            $(".tishi").html("请输入密码");
        }else{
            $(".tishi").css({"display":"none"});
        }
    });



    var oCk=document.cookie.split("; "),oCk1=[];
    for(var m=0;m<oCk.length;m++){
        if(oCk[m].match(/^(name)(.){1,}(mima)$/g)){
            oCk1.push(oCk[m].match(/^(name)(.){1,}(mima)$/g));
        }
    }
    $(".ljlogin").click(function(){

        if(oCk1!=""){
            if($(".yhname input").val()!=oCk1[0][0].split("=")[0].split("name")[1]){
                $(".tishi").css({"display":"block"});
                $(".tishi").html("用户名不存在");
            }else if($(".yhname input").val()==oCk1[0][0].split("=")[0].split("name")[1] && $(".yhmima input").val()==oCk1[0][0].split("=")[1].split("mima")[0]){
                $(".ljlogin").attr("href","../index.html");
                $("#login").html("欢迎"+oCk1[0][0].split("=")[0].split("name")[1])
            }else{
                $(".tishi").css({"display":"block"});
                $(".tishi").html("用户名或密码不正确");
            }
        }else{
            $(".tishi").css({"display":"block"});
            $(".tishi").html("用户名不存在");
        }

    });
});























