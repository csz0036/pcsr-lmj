/**
 * 收藏岗位
 */
app.service('collectionStationService',function($http){

		this.findAll = function(){
			return $http.get("/api/collectionstation/findAll");
		}
		this.update=function(data){
			return $http.post("/api/collectionstation/update",data);
		}
		this.save=function(prodId){
			return $http.post("/api/collectionstation/add?proid="+prodId);
		}
		this.findOne=function(id){
			return $http.get("/api/collectionstation/findOne?id="+id);
		}
		this.delete=function(prodId){
			return $http.get("/api/collectionstation/delete?proid="+prodId);
		}
		this.search=function(page,rows,param){
			return $http.post("/api/collectionstation/search?page="+page+"&rows="+rows,param);
		}
		this.findHotStationList=function(){
			return $http.get("/api/api/hotProject");
		}
		// // www.soiroc.com:9001/collectionsation/search?rows=4&page=1
		// this.search=function(page,rows){
		// 	return $http.post("/api/collectionsation/search?page="+page+"&rows="+rows);
		// }
		this.collectionsation=function(proId){  //取消收藏职位
			return $http.get("/api/collectionstation/delete?proId="+proId);
		}
})
