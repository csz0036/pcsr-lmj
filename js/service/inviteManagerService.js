/*
 * @Author: your name
 * @Date: 2019-12-09 23:25:03
 * @LastEditTime: 2019-12-09 23:56:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /pcsr-lmj/js/service/inviteManagerService.js
 */
app.service('inviteManagerService',function($http){
	this.search=function(page,rows,param){
		return $http.post("/api/invitation/search?page="+page+"&rows="+rows,param);
	}
	this.communication = function(id){
		return $http.post("/api/ordermanager/delete?id="+id);
	}
})