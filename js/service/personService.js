app.service('personService',function($http){
	this.findAll=function(page,rows){
		return $http.get("/api/person/findAll");
	}
	this.update=function(data){
		return $http.post("/api/person/update",data);
	}
	this.save=function(data){
		return $http.post("/api/person/add",data);
	}
	
	this.sxoParams=function(data){
		return $http.get("/api/api/getZtreeById?ztreeId=position");
	}
	this.findOne=function(id){
		return $http.get("/api/person/findOne?id="+id);
	}
	this.dele=function(id){
		return $http.get("/api/person/deleteById?id="+id);
	}
	this.getParams=function(params){
		return $http.get("/api/dictionary/getDics4Display?contants=all"); 
	}
	this.search=function(page,rows,param){
		return $http.post("/api/person/search?page="+page+"&rows="+rows,param);
	}
	this.personList=function(){
		return $http.get("/api/person/personList");
	}
	this.positionsOfInterest=function(proid){
		return $http.get("/api/api/interestedProject?proid="+proid);
	}
	this.proVisitorNum=function(proId,perIds,params){
		return $http.get("/api/api/proVisitorNum?proId="+proId + "&perIds=" + perIds + '&' + params);
	}

	// http://www.soiroc.com:9002/api/selectPersonByMy?pageNo=1&pageSize=10
})