app.service('newsInformationService',function($http){
	this.search=function(page,rows,param){
		return $http.post("/api/newsinformation/search?page="+page+"&rows="+rows,param);
	}
	this.findOne=function(id){
		return $http.get("/api/newsinformation/findOne?id="+id);
	}
})