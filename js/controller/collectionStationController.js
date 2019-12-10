app.controller("collectionStationController",function($scope,collectionStationService){
			// 查询分页
			$scope.findPage=function(page,rows){
			collectionStationService.search(page,rows).success(
					function(response){
						console.log(response,"resss")
						$scope.list=response.rows;	
						$scope.paginationConf.totalItems=response.total;// 更新总记录数
					}			
				)
			}
			// 新增或者更新
			$scope.save=function(){
				var object;
				if($scope.entity.id==null){
					object=collectionStationService.save($scope.entity);
				}else{
					object=collectionStationService.update($scope.entity);
				}
				object.success(
						function(response){
							if(response.success){
								console.log(response);
								$scope.reloadList();
							}else{
								console.log(response.message);
							}
						}
				)
			}
			// 查询单个
			$scope.findOne=function(id){
				collectionStationService.findOne(id).success(function(response){
					$scope.entity=response;
				})
			}
			
			// 删除
			$scope.dele=function(){			
					// 获取选中的复选框
					collectionStationService.dele($scope.selectIds).success(
							function(response){
								if(response.success){
									$scope.reloadList();// 刷新列表
								}						
							}		
					);				
			}
			// 搜索
			$scope.searchEntity={
			// 	pro_name:"pro_name字段",
			// 	min_salary:"min_salary字段",
			// 	max_salary:"max_salary字段",
			// 	city:"city字段",
			// 	min_limit:"min_limit字段",
			// 	"max_limit":"max_limit字段",
			// 	"first_degree":"first_degree字段",
			// 	"gender":"gender字段",
			// 	"estimate_headhunting_fee":"estimate_headhunting_fee字段",
			// 	"visit_number":"1",
			// 	"customerId":"customerId字段",
			// 	"user_id":"1",
			// 	"create_by":"create_by字段",
			};
			
			$scope.search = function(page,rows){
				console.log($scope.searchEntity,"567890-")
				collectionStationService.search(page,rows,$scope.searchEntity).success(function(response){
					console.log(response)
					$scope.list = response.obj.rows;
				})
				
			}
			$scope.addperfavpros = function (proid, $event) {
					console.log(proid)
					
						$($event.target).removeClass("on");		
						layer.msg("取消收藏");			
						collectionStationService.collectionsation(proid.id).success(function(response){
							console.log(response)
							$scope.list.splice(proid,1)
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