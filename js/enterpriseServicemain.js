$(function(){
    var hash=window.location.hash||'';
    if(hash == '#tab1'){
        $(".doServices .btn a").eq(0).trigger("click");
    }else if(hash == '#tab2'){
        $(".doServices .btn a").eq(1).trigger("click");
    }else if(hash == '#tab3'){
        $(".doServices .btn a").eq(2).trigger("click");
    }else if(hash == '#tab4'){
        $(".doServices .btn a").eq(3).trigger("click");
    }else if(hash == '#tab5'){
        $(".doServices .btn a").eq(4).trigger("click");
    }
})