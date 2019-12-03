//https://blog.csdn.net/a4227139/article/details/75041160
$(function() {
	var url = "www.soiroc.com:9002/websocket";  
	var websocket;
	var user ;
	if ('WebSocket' in window) {
		websocket = new WebSocket("ws://" + url);//ReconnectingWebSocket
	} else {
		websocket = new SockJS("http://" + url);
	}
	var userName;
	$.ajax({
		type : "GET",
		url : "http://www.soiroc.com:9002/users/getUserInfo",
		dataType : "JSON",
		async: false,
		success : function(res){
			userName = res.obj.username;
		},
	});
	
	var i = 0;
	if (window.WebSocket) {
		//连接建立
		websocket.onopen = function(evevt) {
			console.log("Connected to WebSocket server.");
			//$('.msg-ball').append('<p class="bg-info message"><i class="glyphicon glyphicon-info-sign"></i>Connected to WebSocket server!</p>');
		}
		//收到消息
		websocket.onmessage = function(event) {
			if(event.data.indexOf("成功") >0){
				return;
			}
			var msg = eval('(' + event.data + ')');//解析收到的json消息数据
			var type = "usermsg"//msg.type; // 消息类型
			var umsg = msg.message; //消息文本
			var uname = msg.name; //发送人
			var uimg = msg.img;
			var ufile = msg.file;
			i++;
			if (type == 'usermsg') {
				if(ufile != "" ){
					$('.scrollBlock').append('<div class="msg guest"><div class="msg-right"><div class="msg-ball">'+ufile+'</div><div class="msg-host"><img src="../images/touxiang.png" alt=""></div></div></div>');
				}
				if(uimg != "" ){
					$('.scrollBlock').append('<div class="msg guest"><div class="msg-right"><div class="msg-ball"><img src="'+ uimg+
					'"/></div><div class="msg-host"><img src="../images/touxiang.png" alt=""></div></div></div>');
				}
				if(umsg != ""){
					$('.scrollBlock').append('<div class="msg guest"><div class="msg-right"><div class="msg-ball">'+ umsg+
					'</div><div class="msg-host"><img src="../images/touxiang.png" alt=""></div></div></div>');
				}
			}
			if (type == 'system') {
				$('.msg-ball').append('<p class="bg-warning message"><a name="'+ i +
						'"></a><i class="glyphicon glyphicon-info-sign"></i>'+ umsg + '</p>');
			}
			$("#LAY_layedit_1").contents().find("body").text("");
			window.location.hash = '#' + i;
		}
		//发生错误
		websocket.onerror = function(event) {
			i++;
			console.log("Connected to WebSocket server error");
			$('.msg-ball').append('<p class="bg-danger message"><a name="' + i + '"></a><i class="glyphicon glyphicon-info-sign"></i>Connect to WebSocket server error.</p>');
			window.location.hash = '#' + i;
		}
		//连接关闭
		websocket.onclose = function(event) {
			i++;
			console.log('websocket Connection Closed. ');
			$('.msg-ball').append( '<p class="bg-warning message"><a name="' + i + '"></a><i class="glyphicon glyphicon-info-sign"></i>websocket Connection Closed.</p>');
			window.location.hash = '#' + i;
		}
		function send() {
			var name = userName;
			var fileStr ;
			var fileHref = $("#LAY_layedit_1").contents().find("body a").attr("href");
			if(fileHref != undefined){
				var fileName = $("#LAY_layedit_1").contents().find("body a").text();
				fileStr = '<a href="'+fileHref+'">'+fileName+'</a>';
				$("#LAY_layedit_1").contents().find("body a").remove();
			}
			var img = $("#LAY_layedit_1").contents().find("body").children("img").attr("src");
			if(img == undefined){
				img = "";
			}
			var message = $("#LAY_layedit_1").contents().find("body").text();//$('#message').val();
			console.log(message);
			if (!name) {
				alert('请输入用户名!');
				return false;
			}
			if (!message && !img && !fileHref) {
				alert('发送消息不能为空!');
				return false;
			}
			var msg = {
				message : message,
				name : name,
				img : img,
				file : fileStr
			};
			try {
				websocket.send(JSON.stringify(msg));
			} catch (ex) {
				console.log(ex);
			}
		}
		//按下enter键发送消息
		$(window).keydown(function(event) {
			if (event.keyCode == 13) {
				console.log('user enter');
				send();
			}
		});
		//点发送按钮发送消息
		$('.send').bind('click', function() {
			send();
		});
	} else {
		alert('该浏览器不支持web socket');
	}

	
	$("#file2").on('change',function(){
		$("#LAY_layedit_1").contents().find("body").text("");
		var inputElement = document.getElementById("file2");
		
		var fileList = inputElement.files;
		var file=fileList[0];
		
		
		var isImage = isAssetTypeAnImage(file.name);
		if(!file) return;
		var reader = new FileReader();
		if(isImage){
			//以二进制形式读取文件
			reader.readAsDataURL(file);
			//文件读取完毕后该函数响应
			reader.onload = function loaded(evt) {
				
					var imgStr = '<img src="'+this.result+'" id="img3" />';
					$("#LAY_layedit_1").contents().find("body").append(imgStr);
				}
				
			}else{
			 reader.readAsText(file);
             reader.onload = function loaded() {
            	 var data = {
           			  file:this.result,
           			  name:file.name,
           			  type:file.type,
           			  size:file.size
           		 };
            	var file_typename =   file.name.substring(file.name.lastIndexOf('.'));
//         		if (file_typename === '.xlsx' || file_typename === '.xls') {
         		$("#filename").css("display","block");
         		$("#filename").val(file.name);
         			UpladFile(file);
         			return ;
//         		}else {
//         			console.log("请选择正确的文件类型！")
//         		} 
              }
		}
		inputElement.outerHTML=inputElement.outerHTML; //清空<input type="file">的值
	})
	
	/**
	 * 判断是否是图片
	 */
	function isAssetTypeAnImage(filePath) {
		//获取最后一个.的位置
		var index= filePath.lastIndexOf(".");
		//获取后缀
		var ext = filePath.substr(index+1);
		
		return ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].indexOf(ext.toLowerCase()) !== -1;
	}
	
	
	
	
	function UpladFile(fileObj) {
        var form = new FormData(); // FormData 对象
        form.append("file2", fileObj); // 文件对象
        console.log(fileObj);
        $.ajax({
            url: 'upload/uploadFile',                      // url地址
            type: 'POST',                 // 上传方式
            data: form,                   // 上传formdata封装的数据
            dataType: 'JSON',
            cache: false,                  // 不缓存
            processData: false,        // jQuery不要去处理发送的数据
            contentType: false,         // jQuery不要去设置Content-Type请求头
            success:function (data) {           // 成功回调
                console.log(data.obj);
                var fileStr = "<a href='"+data.obj+"'>"+fileObj.name+"</a>";
                $("#LAY_layedit_1").contents().find("body").append(fileStr);
            },
            error:function (data) {           // 失败回调
                console.log(data);
            }
        }); 
     }

	
	
	
	
	
	
	
})

