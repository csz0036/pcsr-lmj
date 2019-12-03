/**
 * 应聘简历
 */
app.service('applicationRecordService',function($http){

    // this.findAll = function(){
    //     return $http.get("http://www.soiroc.com:9002/applicationRecord/findAll");
    // }
    // this.update=function(data){
    //     return $http.post("http://www.soiroc.com:9002/applicationRecord/update",data);
    // }
    // this.save=function(prodId){
    //     return $http.post("http://www.soiroc.com:9002/applicationRecord/add?proid="+prodId);
    // }
    // this.findOne=function(id){
    //     return $http.get("http://www.soiroc.com:9002/applicationRecord/findOne?id="+id);
    // }
    // this.delete=function(prodId){
    //     return $http.get("http://www.soiroc.com:9002/applicationRecord/delete?proid="+prodId);
    // }

    this.search=function(page,rows,param){
        return $http.post("/api/selectPersonProject?pageNo="+page+"&pageSize="+rows,param);
    }

})
