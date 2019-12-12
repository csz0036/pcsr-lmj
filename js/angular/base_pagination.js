
var app=angular.module('soiroc',['pagination']);
//定义http拦截器httpInterceptor，这个factory返回的对象可以拥有responseError，response，request，requestError这些属性，分别对应拦截的处理。
app.factory('httpInterceptor', ['$q',function($q) { 
    var httpInterceptor = {
    	      'responseError' : function(response) { //响应错误拦截
    	    	 console.log(response.status);
    	        //这里可以对不同的响应错误进行处理，比如根据返回状态码进行特殊处理
    	        switch(response.status) {
    	            case 404:
    	                console.log("找不到页面");
    	                break;
    	            case 403:
    	                alert("没有权限");
    	                break;
    	            case 302:
    	            	alert("请登录");
    	            	$(".loginAlert").show();
    	            	break;
    	            defalut:
						alert("200");
    	            	break;
    	        }
    	        return $q.reject(response); 
    	      }, 
    	      'response' : function(response) {     //响应拦截
    	        //这里可以对所有的响应的进行处理
    	        return response; 
    	      }, 
    	      'request' : function(config) {        //请求拦截
    	        //这里可以对所有的请求进行处理
    	        return config; 
    	      }, 
    	      'requestError' : function(config){    //请求错误拦截
    	        //这里可以对所有的请求错误进行处理
    	        return $q.reject(config); 
    	      } 
    	    }
    	  return httpInterceptor; 
}]);
//定义了httpInterceptor之后，需要手动添加到$httpProvider.interceptors中去才能让拦截器生效
app.config(['$httpProvider', function($httpProvider) { 
  $httpProvider.interceptors.push('httpInterceptor'); //添加拦截器
}]);

//设置过滤器，过滤指collection中keyName值为value的数据
app.filter('filterRow',function(){         
  return function(collection,keyName,value){
      var output = []
      angular.forEach(collection, function (item) {
        //   console.log("item[keyName]->"+item[keyName])
          if(item[keyName] === value){
              output.push(item)
          }
      })
    //   console.log(output.length)
      return output
  };
})
app.filter('filterSubString',function CarouselContentFilter() {
    return function (str) {
		// console.log('str::::',str,str.length )
        if(str){
            var carContent = '';
            if(str.length >= 50){
                str.length = 50;
                carContent = str.substring(0,50) + '...';
            }
            else {
                carContent = str
            }
            return carContent
        }
    }
})
//设置过滤器,新闻正文内容转HTML
app.filter('to_trusted', ["$sce", function ($sce) {
	return function (html) {
		return $sce.trustAsHtml(html);  
	}
}])
//过滤新闻列表中内容，把图片删除
app.filter('content_trusted', ["$sce", function ($sce) {
	return function (html) {
		var delImg = html.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi,'')
		var reg= delImg.replace(/<\/?.+?\/?>/g,'');
		var lastHTML = '<p>'+reg.substring(0,50) + '...'+'</p>'
		return $sce.trustAsHtml(lastHTML);  
	}
}])
app.filter('ftpChangeImg', function () {
	return function (ftp) {
		var strSplit = JSON.parse(ftp) 
		return 'http://122.14.213.237:8022/'+strSplit.url
	}
})

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(false);
}]);

