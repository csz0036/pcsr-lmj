var scopes, _recommendationRecordService;
/**
 *  推荐记录
 */
app.controller("recommendationRecordController", function($scope, recommendationRecordService,usersService) {
	scopes = $scope;
	_recommendationRecordService = recommendationRecordService;
	// 查询分页
	$scope.findPage = function(page, rows) {
		recommendationRecordService.findPage(page, rows).success(
			function(response) {
				$scope.list = response.rows;
				$scope.paginationConf.totalItems = response.total; // 更新总记录数
			}
		)
	}
	var id =""
	// $scope.getCurrentUser=function(){
	// 	usersService.getCurrentUser.success()(
	// 		function(response){
	// 			console.log(response)
	// 		}
	// 	)
	// }
	
	// 新增或者更新
	$scope.save = function() {
		var object;
		if ($scope.entity.id == null) {
			object = recommendationRecordService.save($scope.entity);
		} else {
			object = recommendationRecordService.update($scope.entity);
		}
		object.success(
			function(response) {
				if (response.success) {
					console.log(response);
					$scope.reloadList();
				} else {
					console.log(response.message);
				}
			}
		)
	}
	// 查询单个
	$scope.findOne = function(id) {
		recommendationRecordService.findOne(id).success(function(response) {
			$scope.entity = response;
		})
	}

	// 删除
	$scope.dele = function() {
		// 获取选中的复选框
		recommendationRecordService.dele($scope.selectIds).success(
			function(response) {
				if (response.success) {
					$scope.reloadList(); // 刷新列表
				}
			}
		);
	}
	// 搜索
	$scope.searchEntity = {
		"state":"01",
		"proName":"职位名称1",
		userId:"",
		perIds: ["1","2"]
	};

    $scope.search = function(page,rows){
		usersService.getCurrentUser().success(function(res){
			console.log(res)
			$scope.searchEntity.userId=res.obj.id;
			recommendationRecordService.search(page,rows,$scope.searchEntity).success(function(response){
				console.log(response)
			})
		});
       
	}

	$scope.selectStatus = function(status) {
		$scope.searchEntity.state = status;
	}



	$scope.reloadList = function() {
		//切换页码
		$scope.search($scope.paginationConf.currentPage,
			$scope.paginationConf.itemsPerPage);
	}
	//分页控件配置
	$scope.paginationConf = {
		currentPage: 1,
		totalItems: 10,
		itemsPerPage: 10,
		perPageOptions: [10, 20, 30, 40, 50],
		onChange: function() {
			$scope.reloadList(); //重新加载
		}
	};

    $scope.selectIds = [];//选中的ID集合
    

    //更新复选
    $scope.updateSelection = function($event, id) {
        console.log($scope.selectIds);
        if ($event.target.checked) {//如果是被选中,则增加到数组
            $scope.selectIds.push(id);
        } else {
            var idx = $scope.selectIds.indexOf(id);
            $scope.selectIds.splice(idx, 1);//删除
        }
    }

	$scope.aa = function() {
		console.log('123456789')
	}


});

// 全选事件
$(function() {
	layui.use('form', function() {
		var form = layui.form;
		var listArr = ['01', '02', '03', '04', '05'];
		scopes.selectIds = listArr.slice(0);
		// 监听复选框事件
		form.on('checkbox(allCheck)', function(data) {
			if (data.value == '0') {
				if (data.elem.checked) {
					scopes.selectIds = listArr;
					$('#checkContent  input').each(function() {
						$(this).prop("checked", true);
						form.render();
					});
				} else {
					scopes.selectIds = [];
					$('#checkContent  input').each(function() {
						$(this).prop("checked", false);
						form.render();
					});
				}
			} else {
				if (data.elem.checked) {
					scopes.selectIds.push(data.value);
				} else {
					var idx = scopes.selectIds.indexOf(data.value);
					scopes.selectIds.splice(idx, 1); //删除
				}
				if (scopes.selectIds && scopes.selectIds.length == listArr.length) {
					$('#checkContent  input').eq(0).prop("checked", true);
					form.render();
				} else {
					$('#checkContent input').eq(0).prop("checked", false);
					form.render();
				}

			}
			//执行搜索ajax
			if (scopes.selectIds && scopes.selectIds.length > 0) {
				var params = {
					state: scopes.selectIds.join(','),
					userId: '1',
					proName: '产品',
					perIds: '1'
				};
				_recommendationRecordService.search(1, 10, params).success(function(response) {
					scopes.list = response.obj;
					if (scopes.list && scopes.list.length > 0) {
						scopes.list = ['1', '2'];
						var str = '';
						$('.nothingTest').addClass('hide');
						for (var i = 0; i < scopes.list.length; i++) {
							str += '<li ng-repeat="pojo in list">' +
								'<span>乔源</span>' +
								'<span>18830149882</span>' +
								'<span><a href="javascript:;">查看</a></span>' +
								'<span>某地产公司</span>' +
								'<span><a href="javascript:;">总经理</a></span>' +
								'<span>年薪100-500w</span>' +
								'<span>' +
								'<h1>猎头顾问:赖畅畅<a href="javascript:;">立即沟通</a></h1>' +
								'<dl>' +
								'<dt class="on"><i>被查看</i></dt>' +
								'<dt class="on"><i>约面试</i></dt>' +
								'<dt class="on"><i>发offer</i></dt>' +
								'<dt class="on"><i>已入职</i></dt>' +
								'</dl>' +
								'</span>' +
								'</li>';
						}
						$('#pojoList').html(str); //渲染到页面上
					} else {
						$('.nothingTest').removeClass('hide');
					}
				})
			}
		});
	});
})
