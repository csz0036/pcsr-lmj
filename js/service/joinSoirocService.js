
app.service('joinSoirocService',function($http){
	this.add=function(data){
		return $http.post("/api/joinsoiroc/add",data);
	}
	// /api/joinsoiroc/search
	this.search=function(rows,page){
		return $http.post("/api/joinsoiroc/search?rows="+rows+"&page="+page);
	}
})