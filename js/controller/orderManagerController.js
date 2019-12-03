app.controller("orderManagerController",function($scope,orderManagerService){
	// 搜索
	$scope.searchEntity={
		paymentStatus:"已支付"
	};
	$scope.nothing = 'block'
	$scope.search = function(page,rows,paymentStatus){
		paymentStatus = $scope.searchEntity
		orderManagerService.search(page,rows,paymentStatus).success(function(response){
			$scope.list = response.obj.rows;	
			$scope.totalRows = response.obj.total;	
			$scope.paginationConf.totalItems = response.obj.total;// 更新总记录数
			if(response.obj.rows.length > 1){
				$scope.nothing = 'none'
			}
		})
	}
	$scope.dele = function(id){
		orderManagerService.dele(id).success(function(response){
			// console.log('response---',response)
			$scope.search($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage,$scope.searchEntity);
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

	$scope.selectIds = [];//选中的ID集合 
	//更新复选
	$scope.updateSelection = function($event, id) {
		if ($event.target.checked) {//如果是被选中,则增加到数组
			$scope.selectIds.push(id);
		} else {
			var idx = $scope.selectIds.indexOf(id);
			$scope.selectIds.splice(idx, 1);//删除 
		}
	}

	// tab 切换
	$scope.tabChange = function(index) {
		console.log('tab切换',index)
		if(index == 1){
			
			$scope.searchEntity={
				paymentStatus:"已支付"
			};
			$("#yesPay").show()
			$("#noPay").hide()
			$scope.search($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage,$scope.searchEntity);
		}else{
			$scope.searchEntity={
				paymentStatus:"待支付"
			};
			$("#yesPay").hide()
			$("#noPay").show()
			$scope.search($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage,$scope.searchEntity);
		}
	}
			
})