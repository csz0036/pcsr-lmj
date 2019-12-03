var app=angular.module('soiroc',[]);
//定义http拦截器httpInterceptor，这个factory返回的对象可以拥有responseError，response，request，requestError这些属性，分别对应拦截的处理。
app.factory('httpInterceptor', ['$q',function($q) { 
    var httpInterceptor = {
    	      'responseError' : function(response) { //响应错误拦截
    	    	 console.log("错误拦截");
    	    	 console.log(response.status);
    	    	 console.log("错误拦截");
    	        //这里可以对不同的响应错误进行处理，比如根据返回状态码进行特殊处理
    	        switch(response.status) {
    	            case 404:
    	                alert("找不到页面");
    	                break;
    	            case 403:
    	                alert("没有权限");
    	                break;
    	            defalut:
    	            	console.log("200");
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