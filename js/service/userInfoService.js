app.service('userInfoService',function($http){
	this.code=function(phone){
		return $http.get("/api/send/sendRegisterCode?phone="+phone);
	}
	this.save=function(data){
		return $http.post("/api/userInfo/add",data);
	}
})