/**
 * Created by Administrator on 2016/10/12.
 */
//搜索功能
function lieb(data,kw1){
    var arr=[];
    for(var k1 in data){
        for(var k2 in data[k1]["part"]){
            if(data[k1]["part"][k2]["name"].match(kw1)==kw1){
                arr.push(k2);
            }
        }
    }
    function shuju(){
        if(arr.length==0){
            $(".liebiao").html(
                "<div class='nosp'>" +
                    "<div>抱歉，暂无与“ <b>"+kw1+"</b> ”相关的商品哦！</div>" +
                    "<a href='../index.html'>返回首页>> </a> " +
                "</div>"
            );
        }else{
            $(".kw1").text(kw1);
        }
    }
    shuju();
    //分页
    var odiv="";
    function fenye(n){
        odiv="";
        for(var i=12*(n-1);i<12*n;i++){
            for(var k3 in data){
                for(var k4 in data[k3]["part"]){
                    if(k4==arr[i]){
                        odiv+=
                            "<div class='thelist left'>" +
                                "<a href='details.html?id="+k4+"'>" +
                                    "<img src='../images/img/"+data[k3]["part"][k4]["lbpic"]+"' alt=''/>" +
                                "</a>" +
                                "<div class='jge'>￥<b>"+data[k3]["part"][k4]["price"]+"</b></div>" +
                                "<a href='details.html?id="+k4+"'>"+data[k3]["part"][k4]["name"]+"</a>" +
                                "<div class='ppjj'>" +
                                    "<a href='#'>已有"+data[k3]["part"][k4]["pjia"]+"人评价</a>";
                                if(data[k3]["part"][k4]["ziying"].length!=0){
                                    odiv+="<span>"+data[k3]["part"][k4]["ziying"]+"</span>";
                                }
                        odiv+=  "</div>" +
                                "<div>" +
                                    "<div class='jiaj left'>" +
                                        "<input class='left' type='text' value='1'/>" +
                                        "<span class='add left'>+</span>" +
                                        "<span class='jian left'>-</span>" +
                                    "</div>" +
                                    "<a class='lbcar joincar' data-id='"+k4+"' href='javascript:'>加入购物车</a>" +
                                "</div>" +
                            "</div>";
                    }
                }
            }
        }
        $(".list").html(odiv);
        if($(".ppjj").find("span").text().length==0){
            $(".ppjj").find("span").hide();
        }
        addcar11();
    }
    fenye(1);
    //分页的页码
    function yema(){
        var page=Math.ceil(arr.length/12);
        $(".tcdPageCode").createPage({
            pageCount:page,
            current:1,
            backFn:function(p){
                console.log(p);
                fenye(p);
            }
        });
    }
    yema();
//添加购物车功能
    function addcar11(){
        //购物车数量减
        var a=0;
        $(".jian").click(function(){
            a=Number($("input",".jiaj").val());
            if(a>1){
                $("input",".jiaj").val(a-1);
            }else{
                $("input",".jiaj").val(1);
            }
        });
        //购物车数量加
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
        }
        $(".joincar").click(function(){
            addcar($(this).attr("data-id"));
            fei($(this).parents(".thelist"));
        });
        //加入购物车图片飞动效果
        function fei(that){
            var cart = $('.gwc');
            var imgtodrag = $(that).find('img').eq(0);
            if (imgtodrag) {
                var imgclone = imgtodrag.clone().offset({
                    top: imgtodrag.offset().top,
                    left: imgtodrag.offset().left
                }).css({
                    'position': 'absolute',
                    'height': '200',
                    'width': '200',
                    'z-index': '100'
                }).appendTo($('body')).animate({
                    'top': cart.offset().top +20,
                    'left': cart.offset().left +10,
                    'width': 40,
                    'height': 40
                }, 1000);
                setTimeout(function () {
                    cart.effect('shake', { times: 2 }, 200);
                }, 1500);
                imgclone.animate({
                    'width': 0,
                    'height': 0
                }, function () {
                    $(this).detach();
                    shul();
                });
            }

        }
    }


}














$(function(){
    var keyword=decodeURI(window.location.search);
    var us1=[];
    if(keyword!=""){
        var kw = keyword.replace(/[?]/g, "").split("&");
        for (var i = 0; i < kw.length; i++) {
            us1.push(kw[i].split("="));
        }
        for (var n = 0; n < us1.length; n++) {
            if (us1[n][0] == "keyword") {
                var kw1=us1[n][1];

                $.get("../data/list_all.json",{},function(data){
                    lieb(data,kw1);
                },"json");
            }
        }
    }
});