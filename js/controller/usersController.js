/*
 * @Author: your name
 * @Date: 2019-12-02 14:09:11
 * @LastEditTime: 2019-12-09 21:34:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /pcsr-lmj/js/controller/usersController.js
 */
//判断是否登录
var successfn = function(res){
	if(res.obj.username !='anonymousUser'){

		$("#welcomeName").text("欢迎你："+res.obj.username);
		// layer.closeAll();
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
		
		$(".topPosts").on("click","a.employBestPosition",function(){
			window.location.href = "../pages/悬赏职位.html";
		});

		$(".JobDetails .recommend").show();

		if(res.obj.id){
			window.localStorage.setItem('userId',res.obj.id)
			window.localStorage.setItem('userInfo',JSON.stringify(res.obj))
		}
	}else{
		console.log('登录信息222',res.obj.username)

		$(".loggedIn").hide();
		$(".JobDetails .recommend").hide();
        $(".header .nav").removeClass("resume-nav");
		$(".notLogin").css("display","flex");
		$(".topPosts").on("click","a.employBestPosition",function(){
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
				end:function(){
					window.location.href = '../pages/悬赏职位.html'
				}
			});
		});


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
				end:function(){
					window.location.href = '../pages/顶级职位.html'
				}
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
	getUserInfo(successfn)
};

var upUsrPw = function(){
	var json = $.getFormData("upUsrPw");
	if(window.localStorage.getItem('userInfo')){
		json.username = JSON.parse(window.localStorage.getItem('userInfo')).moblie
	}
	$.ajax({
		type: 'post',
		url: "/api/userInfo/updateUserPassword",
		// contentType: "formData",  
		contentType: 'application/json',
		data: json,
		success: function(data){  
			if(data.success == true){
				alert('修改密码成功')
			} else {
				alert(data.message)

			}
		}, 
		error:function(e){  
			alert(e.message)
		}  
	});
	// updateUserPassword(json).success(function(res){
		
	// })
}