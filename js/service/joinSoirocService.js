
app.service('joinSoirocService',function($http){
	this.add=function(data){
		return $http.post("/api/joinsoiroc/add",data);
	}
	this.findAll=function(data){
		return $http.get("/api/joinsoiroc/findAll",data);
	}
	// /api/joinsoiroc/search
	this.search=function(rows,page,param){
		return $http.post("/api/joinsoiroc/search?rows="+rows+"&page="+page,param);
	}
})