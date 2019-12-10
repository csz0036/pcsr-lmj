var scopes, _applicationRecordService;

app.controller("applicationRecordController", function($scope, applicationRecordService) {
	scopes = $scope;
	_applicationRecordService = applicationRecordService;

	// 查询分页
	$scope.findPage = function(page, rows) {
		applicationRecordService.findPage(page, rows).success(
			function(response) {
				var strVobj = JSON.parse(response.obj)
				console.log('strVobj:::',strVobj)
				$scope.list = strVobj.dataJson;
				$scope.paginationConf.totalItems = strVobj.totalPages; // 更新总记录数
			}
		)
	}
	// 新增或者更新
	$scope.save = function() {
		var object;
		if ($scope.entity.id == null) {
			object = applicationRecordService.save($scope.entity);
		} else {
			object = applicationRecordService.update($scope.entity);
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
		applicationRecordService.findOne(id).success(function(response) {
			$scope.entity = response;
		})
	}

	// 删除
	$scope.dele = function() {
		// 获取选中的复选框
		applicationRecordService.dele($scope.selectIds).success(
			function(response) {
				if (response.success) {
					$scope.reloadList(); // 刷新列表
				}
			}
		);
	}
	// 搜索
	$scope.searchEntity = {
		perIds: [],
		userId: localStorage.getItem('userId')
	};

	$scope.search = function(page, rows) {
		console.log($scope.searchEntity);
		applicationRecordService.search(page, rows, $scope.searchEntity).success(function(response) {
			$scope.list = response.obj;
		})

	}

	$scope.selectStatus = function(status) {
		$scope.searchEntity.state = status;
	}



	$scope.reloadList = function() {
		//切换页码
		$scope.search($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
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

	$scope.selectIds = []; //选中的ID集合
	//更新复选
	$scope.updateSelection = function($event, id) {
		console.log($scope.selectIds);
		if ($event.target.checked) { //如果是被选中,则增加到数组
			$scope.selectIds.push(id);
		} else {
			var idx = $scope.selectIds.indexOf(id);
			$scope.selectIds.splice(idx, 1); //删除
		}
	}


});
// 全选事件
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
		if (scopes.selectIds && scopes.selectIds.length > 0) {
			var params = {
				state: scopes.selectIds.join(','),
				userId: '1',
				proName: '产品',
				perIds: '1'
			};
			_applicationRecordService.search(1, 10, params).success(function(response) {
				scopes.list = response.obj;
				if (scopes.list && scopes.list.length > 0) {
					var str = '';
					$('.nothingTest').addClass('hide');
					for (var i = 0; i < scopes.list.length; i++) {
						str += '<li>' +
							'<div class="tit">' +
							'<h1>酒店事业部经理</h1>' +
							'<h2>年薪100-150万   某地产公司</h2>' +
							'<h3>北京丨 10-12年丨大专统招丨男</h3>' +
							'</div>' +
							'<div class="step">' +
							'<span class="on"><i>被查看</i></span>' +
							'<span class="on"><i>约面试</i></span>' +
							'<span class="on"><i>发offer</i></span>' +
							'<span class="on"><i>已入职</i></span>' +
							'</div>' +
							'<div class="right">' +
							'<h1>猎头顾问:赖畅畅<a href="javascript:;">立即沟通</a></h1>' +
							'<h2>投递简历:李磊-简历1</h2>' +
							'</div>' +
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
// })
