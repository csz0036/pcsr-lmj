app.service('soirocCollegeService',function($http){
	this.add=function(data){
		return $http.post("/api/soiroccollege/add",data);
	}
})