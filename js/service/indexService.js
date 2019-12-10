app.service('indexService',function($http){
    //高端职位
    this.search=function(page,rows,param){
        return $http.post("/api/api/publishPositionList?pageNo="+page+"&pageSize="+rows,param || {});
    }
    
})
