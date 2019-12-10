app.service('usersService',function($http){
    this.getCurrentUser=function(){
        return $http.get("/api/users/getUserInfo");
	}
    this.getIsLogin=function(){
        return $http.get("/api/users/islogin");
    }
});

var model = "/api/" +"users"+"/";
//读取列表数据绑定到表单中
var findAll = function(){
	return $.get(model + "findAll");
}
//查询实体
var findOne = function(id){
	return $.get(model + "findOne?id="+id);
}
//增加
var add = function(entity){
	return  $.post(model + "add",entity);
}
//修改
var update = function(entity){
	return  $.post(model + "update",entity);
}
//修改密码
var updateUserPassword = function(entity){
	return  $.post(model + "updateUserPassword",entity);
}
//删除
var dele = function(ids){
	return $.get(model + "delete?ids="+ids);
}
//搜索
var search = function(page,rows,searchEntity){
	return $.post(model + "search?page="+page+"&rows="+rows, searchEntity);
}

//获取用户信息
var getUserInfo = function(successfn){
	return $.get_s(model+"getUserInfo",null,successfn);
}

//获取用户信息
var getCurrentUser = function(){
	return $.getNoData(model+"getUserInfo");
}
var loginOut = function(){
	return $http.get("/api/logout")
}