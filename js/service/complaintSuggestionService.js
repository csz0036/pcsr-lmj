
app.service('complaintSuggestionService',function($http){
	this.save=function(data){
		return $http.post("/api/complaintsuggestion/add",data);
	}
})