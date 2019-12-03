app.service('orderManagerService',function($http){
	this.search=function(page,rows,param){
		return $http.post("/api/ordermanager/search?page="+page+"&rows="+rows,param);
	}
	this.dele = function(id){
		return $http.post("/api/ordermanager/delete?id="+id);
	}
})