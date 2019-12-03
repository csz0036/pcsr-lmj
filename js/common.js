/***************************************************************************
 * jQuery Ajax封装通用类 勾营
 **************************************************************************/
$(function() {
	
	//默认成功之后
	var $successfn = function(res){
		if (!(res && res.code === 0)) {
			alert(res.message);
			return;
		}else{
			console.log("操作成功");
			console.log(res);
			return res;
		}
	}
	//默认失败之后
	var $errorfn = function(error){
		try {
			if (err.status == 302) {
	    		alert("请重新登录");
	            return;
	         }

			if (err.status == 403) {
				alert("您没有权限访问");
				return;
			}
		}catch(err){
			alert("你请求的地址出现错误："+error.responseJSON.error);
		}
	}
	//{params:{page:page,rows,rows}} angular的get可以这么传参 此处待验证
	jQuery.get = function(url,data){
		$.ajax({
			type : "GET",
			data : data,
			url : url,
			dataType : "JSON",
			success : function(d){$successfn(d)},
			error : function(e){$errorfn(e)}
		});
	};
	jQuery.getNoData = function(url){
		$.ajax({
			type : "GET",
			url : url,
			dataType : "JSON",
			success : function(d){$successfn(d)},
			error : function(e){$errorfn(e)}
		});
	};
	jQuery.get_s = function(url,data,successfn){
		$.ajax({
			type : "GET",
			data : data,
			url : url,
			dataType : "json",
			success : successfn,
			error : function(e){$errorfn(e)}
		});
	};
	jQuery.get_s_e = function(url,data,successfn,errorfn){
		$.ajax({
			type : "GET",
			data : data,
			url : url,
			dataType : "json",
			success : successfn,
			error : errorfn
		});
	}

	jQuery.post = function(url, data){
		$.ajax({
			type : "POST",
			data : data,
			url : url,
			dataType : "JSON",
			contentType:"application/json;charset=utf-8",
			success : function(d){$successfn(d)},
			error : function(e){$errorfn(e)}
		});
	}
	jQuery.post_s = function(url, data,successfn){
		$.ajax({
			type : "POST",
			data : data,
			url : url,
			dataType : "json",
			contentType:"application/json;charset=utf-8",
			success : successfn,
			error : function(e){$errorfn(e)}
		});
	}
	jQuery.post_s_e = function(url, data,successfn,errorfn){
		$.ajax({
			type : "POST",
			data : data,
			url : url,
			dataType : "json",
			contentType:"application/json;charset=utf-8",
			success : successfn,
			error : errorfn
		});
	}
	
	jQuery.getFormData = function(formId){
		var formObject = {};
        var formArray =$("#"+formId).serializeArray();
        $.each(formArray,function(i,item){
            formObject[item.name] = item.value;
        });
        return JSON.stringify(formObject);
	}
})
