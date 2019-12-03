$(function(){
    $(".admin-joinSr .page-btn a").click(function(){
        var index = $(this).index();
        $(this).addClass("on").siblings("a").removeClass("on");
        $(".admin-joinSr .table .list").eq(index).show().siblings(".list").hide();
    });
    $(".set-price .page-btn a").click(function(){
        var index = $(this).index();
        $(this).addClass("on").siblings("a").removeClass("on");
        $(".set-price .list-content .list").eq(index).show().siblings(".list").hide();
    });

    $(".user-management .table .passBtn i").mousedown(function(){
        $(this).siblings("input").attr("type","text");
    });
      $(".user-management .table .passBtn i").mouseup(function(){
        $(this).siblings("input").attr("type","password");
    });
})