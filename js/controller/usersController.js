//判断是否登录
var successfn = function(res){
	if(res.obj.username !='anonymousUser'){
		$("#welcomeName").text("欢迎你："+res.obj.username);
		layer.closeAll();
		$(".loginAlert").hide();
		$(".notLogin").hide();
		$(".header .nav").addClass("resume-nav");
		$(".loggedIn").css("display","flex");
		$(".highPost").on("click",".highPostContent .list .more a",function(){
			window.location.href = "../pages/顶级职位.html";
		});
		$(".highPost").on("click",".highPostContent .list li .btn a",function(){
			window.location.href = "../pages/顶级职位.html";
		});
		$(".JobDetails .recommend").show();
	}else{
		$(".loggedIn").hide();
		$(".JobDetails .recommend").hide();
        $(".header .nav").removeClass("resume-nav");
		$(".notLogin").css("display","flex");
		$(".highPost").on("click",".highPostContent .list .more a",function(){
			layer.open({     
				type: 1,
				title: false,
				closeBtn: 0,
				shadeClose: true,
				skin: '',
				area: 'auto',
				maxWidth :"auto",
				maxHeight : "auto",
				resize : false,
				content: $(".lay-sign"),
			});
		});
		$(".highPost").on("click",".highPostContent .list li .btn a",function(){
			layer.open({     
				type: 1,
				title: false,
				closeBtn: 0,
				shadeClose: true,
				skin: '',
				area: 'auto',
				maxWidth :"auto",
				maxHeight : "auto",
				resize : false,
				content: $(".lay-sign"),
			});
		});
	}
	
}
var getUserName = function(){
	var user = getCurrentUser();
	return user;
}
var showUserOrHide = function(){
	getUserInfo(successfn);
};

var upUsrPw = function(){
	var json = $.getFormData("upUsrPw");
	updateUserPassword(json);
}