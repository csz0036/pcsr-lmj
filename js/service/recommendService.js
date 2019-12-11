
app.service('recommendService',function($http){
    this.update=function(data){
        return $http.post("/api/recommend/updaterecommend",data);
    }
    this.save=function(data){
        return $http.post("/api/recommend/add",data);
    }
    // 推荐人保存
    this.saveRecommend=function(data){
        return $http.post("/api/person/add",data);
    }
    // 推荐人列表
    this.getRecommendList=function(){
		return $http.get("/api/person/personList");
    }
    // 人才简历加入职位
    this.recommendPush=function(param){
		return $http.get("/api/api/addPerson?"+param.proId+"&"+param.perIds);
	}
    this.findAll=function(){
        return $http.get("/api/recommend/findAll");
    }
    this.findOne=function(id){
        return $http.get("/api/recommend/findOne?id="+id);
    }
    this.dele=function(ids){
        return $http.get("/api/recommend/delete?ids="+ids);
    }
    this.search=function(page,rows,param){
        return $http.post("/api/recommend/search?page="+page+"&rows="+rows,param);
    }
    this.selectPersonProject=function(page,rows,param){
		return $http.post("/api/api/selectPersonProject?pageNo="+page+"&pageSize="+rows,param);
	}
})
