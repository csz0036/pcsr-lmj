app.controller("newsInformationController",function($location,$scope,newsInformationService){
	//截取url name的值
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r != null) return unescape(r[2]); return null; //返回参数值
	}


	//新闻详情上一页 下一页
	$scope.nextPrev = {
		id:getUrlParam("id"),
		prevId : getUrlParam("id"),
		prevTitle : getUrlParam("prevTitle"),
		nextId : getUrlParam("nextId"),
		nextTitle : getUrlParam("nextTitle")
	};

	console.log($scope.nextPrev)

	// 查询单个
	$scope.findOne=function($event){
		var id = $scope.nextPrev.id;
		newsInformationService.findOne(id).success(function(response){
			$scope.entity=response.obj;
		});
	}


	
	// 搜索
	$scope.searchEntity={}
	
	$scope.search = function(page,rows){
		newsInformationService.search(page,rows,$scope.searchEntity).success(function(response){
			$scope.list = response.obj.rows;
			$scope.totalRows = response.obj.total;	
			$scope.paginationConf.totalItems = response.obj.total;// 更新总记录数
		})
	}
	
	$scope.reloadList = function() {
		//切换页码  
		$scope.search($scope.paginationConf.currentPage,
				$scope.paginationConf.itemsPerPage);
	}
	//分页控件配置 
	$scope.paginationConf = {
		currentPage : 1,
		totalItems : 10,
		itemsPerPage : 10,
		isLinkPage : false,
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
			
})