app.service('yingpinService',function($http){
		this.findAll=function(page,rows){
			return $http.get("/api/yingpin/findAll");
		}
		this.projectFindAll=function(page,rows){
			return $http.get("/api/person/findAll");
		}
		this.update=function(data){
			return $http.post("/api/yingpin/update",data);
		}
		this.save=function(data){
			return $http.post("/api/yingpin/add",data);
		}
		this.findOne=function(id){
			return $http.get("/api/yingpin/findOne?id="+id);
		}
		this.dele=function(ids){
			return $http.get("/api/yingpin/deleteyingpinByIds?ids="+ids);
		}
		this.search=function(page,rows,param){
			return $http.post("/api/yingpin/search?page="+page+"&rows="+rows,param);
		}
		this.jobDetails=function(id){
			return $http.get("/api/api/getProjectInfoById?id="+id);
		}
		this.interestedProject=function(proId){
			return $http.get("/api/api/interestedProject?proId="+proId);
		}
		this.addcollectionsation = function(param){
		
			return $http.post("/api/collectionstation/add?",param);
			// return $http.post("/api/collectionsation/update?pro_id="+proId,param);
		}

		this.collectionsation=function(proId){  //取消收藏职位
			return $http.get("/api/collectionstation/delete?id="+proId);
		}
		
		
})
