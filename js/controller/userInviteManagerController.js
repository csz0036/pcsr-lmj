
app.controller("userInviteManagerController",function($scope,userInviteManagerService){
	// 搜索
	$scope.searchEntity={
		paymentStatus:"已支付"
	};
	$scope.search = function(page,rows,paymentStatus){
		paymentStatus = $scope.searchEntity
		userInviteManagerService.search(page,rows,paymentStatus).success(function(response){
			$scope.list = response.obj.rows;	
			$scope.totalRows = response.obj.total;	
			$scope.paginationConf.totalItems = response.obj.total;// 更新总记录数
		
		})
	}
	$scope.reloadList = function() {
		//切换页码  
		$scope.search($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage,$scope.searchEntity);
	}
    //第一次加载标志位
    $scope.loadDataFirst = 1;
	//分页控件配置 
	$scope.paginationConf = {
		currentPage : 1,
		totalItems : 10,
		itemsPerPage : 10,
		perPageOptions : [ 10, 20, 30, 40, 50 ],
		onChange : function() {
            if($scope.loadDataFirst == 1) {
                $scope.reloadList(); //重新加载
                $scope.loadDataFirst = 2;
            }else if($scope.loadDataFirst == 2) {
                $scope.loadDataFirst = 0;
            }else if ($scope.loadDataFirst == 0) {
                $scope.reloadList(); //重新加载
            }
		}
	};
			
})