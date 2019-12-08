app.service('indexService',function($http){
    this.search=function(page,rows,param){
        return $http.post("/api/api/publishPositionList?pageNo="+page+"&pageSize="+rows,param || {});
    }
    
})
