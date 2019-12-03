
//var model = $.host +"enterpriseservice"+"/";
app.service('enterpriseServiceService',function($http){
	this.update=function(data){
		return $http.post("/api/enterpriseservice/update",data);
	}
	this.save=function(data){
		return $http.post("/api/enterpriseservice/add",data);
	}
	this.findOne=function(id){
		return $http.get("/api/enterpriseservice/findOne?id="+id);
	}
	this.dele=function(id){
		return $http.get("/api/enterpriseservice/delete?id="+id);
	}
	this.search=function(page,rows,param){
		return $http.post("/api/enterpriseservice/search?page="+page+"&rows="+rows,param);
	}
	this.selectOptionList=function(){
		return $http.get('/api/enterpriseservice/selectOptionList');
	}
})