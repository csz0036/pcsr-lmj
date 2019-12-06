$(function(){

  $(".header .nav").load("../common/headerNav.html",function(){
    $(".headerB .nav .logo img").attr("src","../images/logoH.png");
    $(".header .nav .list ul li a").each(function(){
      $this = $(this);
      if($this[0].href==String(window.location)){
          $this.parent("li").eq(0).addClass("active");
      }
    });

    
  });  //引入导航
  $(".footer").load("../common/footer.html");   //引入底部
  $(".alertBox").load("../common/share.html",function(){
    
  });   //引入弹窗
  $(".loginAlert").load("../common/headerLogin.html",function(){ //头部引入登录
    var sc =  document.createElement("script");
    sc.src= "../js/login.js";
    $("body").append(sc);
    
    //***************************************************************
      showUserOrHide();
    //***************************************************************
  });   

    function linksrcb(src){
      var i = src.lastIndexOf("_b.png");
      var str = src.substr(0,i);
      return str;
    }
    function linksrc(src){
      var i = src.lastIndexOf(".png");
      var str = src.substr(0,i);
      return str;
    }
    $(".links a").hover(function(){
      var src = $(this).find("img").attr("src");
      $(this).find("img").attr("src",linksrcb(src) + ".png");
    },function(){
      var src = $(this).find("img").attr("src");
      $(this).find("img").attr("src",linksrc(src) + "_b.png");
    });
    // $(".highPost",".highPostContent .list ul li").hover(function(){
    //    alert();
    //     $(this).find(".test").stop(true,false).animate({"bottom":"0"},500);
    // },function(){
    //     $(this).stop();
    //     $(this).find(".test").stop(true,false).animate({"bottom":"-85px"},500);
    // })
    $(".highPost").on("mouseenter",".highPostContent .list ul li",function(){
      $(this).find(".test").stop(true,false).animate({"bottom":"0"},500);
    });
    $(".highPost").on("mouseleave",".highPostContent .list ul li",function(){
      $(this).stop();
      $(this).find(".test").stop(true,false).animate({"bottom":"-85px"},500);
    });

    $(".scrollTop").click(function(){
      $("html,body").animate({scrollTop: 0}, 500);
    });


    $(".fixed-right .kf").click(function(){
      _MEIQIA('showPanel')
    })
   
    $(".highPost .highPostBtn a").click(function(){
      var index = $(this).index();
      $(this).addClass("on").siblings("a").removeClass("on");
    })
    $(".services .list ul li").hover(function(){
      $(this).addClass("on").siblings("li").removeClass("on");
    },function(){

    });
    $(".collection a").click(function(){
      if($(this).find("img").attr("src") == "../images/icon8.png"){
        $(this).find("img").attr("src","../images/icon9.png");
      }else{
        $(this).find("img").attr("src","../images/icon8.png");
      }
    });

    $(".doServices .btn a").click(function(){
      var index = $(this).index();
      $(this).addClass("on").siblings("a").removeClass("on");
      $(".doServices .list").eq(index).show().siblings(".list").hide();
    })
    $(".srAdvantage .btn a").click(function(){
      var index = $(this).index();
      $(this).addClass("on").siblings("a").removeClass("on");
      $(".srAdvantage .btnMain").eq(index).show().siblings(".btnMain").hide();
    });

    $(".addSr .table table tr").click(function(){
      var index =  $(this).index();
      if(index != 0){
        
        if($(this).find("i").hasClass("on")){
          $(this).find("i").removeClass("on");
          $(".addContent").hide();
        }else{
          $(this).find("i").addClass("on").parents("tr").siblings().find("i").removeClass("on");
          $(".addContent").eq(index-1).show().siblings(".addContent").hide();
        }
      };
    });
    $(".addSr .addContent a").click(() =>{
      $(".addFrom").show();
      $(".addSr").hide();
    })
    $(".jop .btn a").click(function(){
      var index = $(this).index();
      $(this).addClass("on").siblings("a").removeClass("on");
      $(".jopPage").eq(index).show().siblings(".jopPage").hide();
    });
    // $(".jobReward .optionBtn .btn1 dt").click(function(){
    //   if(!$(this).hasClass("on")){
    //     $(this).addClass("on").siblings("dt").removeClass("on");
    //   }else{
    //     $(this).removeClass("on");
    //   };
    // }); 
    // $(".jobReward .optionBtn .cityBox").on('click','dt',function(){
    //   if($(this).text() != "全国"){
    //     $(".jobReward .optionBtn .cityPageBtn,.jobReward .optionBtn .city").css("display","flex");
    //   }else{
    //     $(".jobReward .optionBtn .cityPageBtn,.jobReward .optionBtn .city").hide();
    //   };
    //   if(!$(this).hasClass("on")){
    //     $(".jobReward .optionBtn .cityPageBtn,.jobReward .optionBtn .city").hide();
    //   };
    // });
    // $(".jobReward .optionBtn .cityPageBtn dt").on('click',function(){
    //   var index = $(this).index();
    //   $(this).addClass("on").siblings("dt").removeClass("on");
    //   $(".jobReward .optionBtn .cityMetro").eq(index).css("display","flex").siblings(".cityMetro").hide();
    //   $(".jobReward .optionBtn .cityMetro dt").removeClass("on");
    // });
    
    // $('.metro').on('click','dt',function(){
    //   $('.metroList').css('display','flex');
    // })
   
    $(".jobReward .optionBtn .secondBox dt").on('click',function(){
      if(!$(this).hasClass("second")){
        $(".jobReward .optionBtn .secondList").hide();
      }
    })

    $(".second").click(function(){
    })

    $(".jobReward").on('click',".optionBtn .second",function(e){
      var hh= $(this).next().outerHeight();
      if($(this).siblings(".secondList").is(":hidden")){
        $(".jobReward .secondList").hide();
        $(".jobReward .second").removeClass("on");
        $(this).addClass("on");
        $(this).siblings(".secondList").show();
        if($(this).siblings(".secondList").offset().left > 730){
          $(this).siblings(".secondList").css({"left":"auto","right":"0"});
        }
        $(this).parents("li").css("margin-bottom",hh);
      }else{
        $(this).siblings(".secondList").hide();
        $(this).parents("li").css("margin-bottom","0");
      };
    });

    $(".jobReward .jobs .allJobs .tops h1 span").click(function(){
      $(this).addClass("on").siblings("span").removeClass("on");
    })

    $(".optionOpen .stopBtn").click(function(){
      if($(".retract").is(":hidden")){
        $(this).find("span").text("收起").siblings("i").css("transform","rotate(180deg)");
        $(".retract").css("display","flex");
      }else{
        $(this).find("span").text("展开").siblings("i").css("transform","rotate(0deg)");
        $(".retract").hide();
      }
    });
    $(".allJobs ul li .sc span").click(function(){
      if(!$(this).hasClass("on")){
        $(this).addClass("on");
      }else{
        $(this).removeClass("on");
      };
    });
    $(".JobDetails .JobDetailsContnet .tops .right .sc span").click(function(){
      if(!$(this).hasClass("on")){
        $(this).addClass("on");
      }else{
        $(this).removeClass("on");
      };
    });
    $(".jobsNewAlert .pageBtn a").click(function(){
      var index = $(this).index();
      $(this).addClass("on").siblings("a").removeClass("on");
      $(".jobsNewAlert .content").eq(index).show().siblings(".content").hide();
    });

    $(".now-industry-alert .list ul li").click(function(){
      $(this).addClass("on").siblings("li").removeClass("on");
      $(".now-industry").val($(this).text());
    });

    $(".expectation-industry-alert .list li").click(function(){
     
      var length = $(".expectation-industry-alert .list .on").length;


      if(!$(this).hasClass("on")){
        console.log(length);
        if(length == 3){
          $(".topsAlert span").text("最多只能选择3个期望行业");
              layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                shade: 0,
                time: 2000,
                skin: '',
                area: 'auto',
                maxWidth :"auto",
                maxHeight : "auto",
                resize : false,
                content: $(".topsAlert"),
            });
        }else{
          $(this).addClass("on");
        }
      }else{
        $(this).removeClass("on");
      };
    });
    $(".personal-center-password .from dl dd span.yan").mousedown(function(){
      $(this).siblings("input").attr("type","text");
    });
    $(".personal-center-password .from dl dd span.yan").mouseup(function(){
      $(this).siblings("input").attr("type","password");
    });

    $(".my-order .tops .btn a").click(function(){
      var index = $(this).index();
      $(this).addClass("on").siblings("a").removeClass("on");
      $(".my-order .content").eq(index).show().siblings(".content").hide();
    });

    
    $(".resume-content .slideList .tops .resumeText h1 i").click(function(e){
      $(this).siblings("input").prop("disabled",false).addClass("on");
      e.stopPropagation();
    });
    $(".resume-content .slideList .tops .resumeText h1 input").click(function(e){
      e.stopPropagation();
    });
    $(document).click(function(){
      $(".resume-content .slideList .tops .resumeText h1 input").prop("disabled",true).removeClass("on");
    });

    $(".resume-content .btn .bj").click(function(){
      $(".resume-content .edit").show();
      $(".btn .add").hide();
      $(this).hide().siblings("a").css("display","inline-block");
      $(".resume-content .btn .add").css("display","inline-block");
    });
    $(".resume-content .btn .cancel").click(function(){
      $(".resume-content .edit").hide();
      $(".btn .add").hide();
      $(this).hide().siblings(".Preservation").hide().siblings(".bj").css("display","inline-block");
    });
    $(".resume-content .btn .Preservation").click(function(){
      // $(".resume-content .edit").hide();
      // $(this).hide().siblings(".cancel").hide().siblings(".bj").css("display","inline-block");
    });

    
    

});