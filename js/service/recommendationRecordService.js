/**
 * 推荐记录
 */
app.service('recommendationRecordService',function($http){

    // this.findAll = function(){
    //     return $http.get("http://www.soiroc.com:9002/recommendationRecord/findAll");
    // }
    // this.update=function(data){
    //     return $http.post("http://www.soiroc.com:9002/recommendationRecord/update",data);
    // }
    // this.save=function(prodId){
    //     return $http.post("http://www.soiroc.com:9002/recommendationRecord/add?proid="+prodId);
    // }
    // this.findOne=function(id){
    //     return $http.get("http://www.soiroc.com:9002/recommendationRecord/findOne?id="+id);
    // }
    // this.delete=function(prodId){
    //     return $http.get("http://www.soiroc.com:9002/recommendationRecord/delete?proid="+prodId);
    // }

    this.search=function(page,rows,param){
        return $http.post("/api/api/selectPersonProject?pageNo="+page+"&pageSize="+rows,param);
    }
    // this.findHotStationList=function(){
    //     return $http.get("/api/api/selectPersonByMy?pageNo=1&pageSize=10");
    // }
})
