/*
 * @Author: your name
 * @Date: 2019-12-09 23:24:30
 * @LastEditTime: 2019-12-10 00:00:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /pcsr-lmj/js/controller/inviteManagerController.js
 */
app.controller("inviteManagerController",function($scope,inviteManagerService){
	// 搜索
	$scope.searchEntity={
		paymentStatus:"已支付"
	};
	$scope.nothing = 'block'
	$scope.search = function(page,rows,paymentStatus){
		paymentStatus = $scope.searchEntity
		inviteManagerService.search(page,rows,paymentStatus).success(function(response){
			$scope.list = response.obj.rows;	
			$scope.totalRows = response.obj.total;	
			$scope.paginationConf.totalItems = response.obj.total;// 更新总记录数
			if(response.obj.rows.length > 1){
				$scope.nothing = 'none'
			}
		})
	}
    //立即沟通
	$scope.communication = function(id){
		inviteManagerService.communication(id).success(function(response){
			// $scope.search($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage,$scope.searchEntity);
		})
	}
	
	$scope.reloadList = function() {
		//切换页码  
		$scope.search($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage,$scope.searchEntity);
	}
	//分页控件配置 
	$scope.paginationConf = {
		currentPage : 1,
		totalItems : 10,
		itemsPerPage : 10,
		perPageOptions : [ 10, 20, 30, 40, 50 ],
		onChange : function() {
			$scope.reloadList();//重新加载
		}
	};

	
	
			
})