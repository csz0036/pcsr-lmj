/*
 * @Author: your name
 * @Date: 2019-12-02 14:09:11
 * @LastEditTime: 2019-12-09 17:50:41
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /pcsr-lmj/js/service/applicationRecordService.js
 */
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
        return $http.post("/api/api/selectPersonProject?pageNo="+page+"&pageSize="+rows,param);
    }

})
