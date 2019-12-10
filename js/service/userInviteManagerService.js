/*
 * @Author: your name
 * @Date: 2019-12-09 17:08:55
 * @LastEditTime: 2019-12-09 17:10:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /pcsr-lmj/js/service/userInviteManagerService.js
 */
app.service('userInviteManagerService',function($http){
	this.search=function(page,rows,param){
		return $http.post("/api/ordermanager/search?page="+page+"&rows="+rows,param);
	}
})