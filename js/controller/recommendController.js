app.controller("recommendController",function($scope,recommendService){
    // 查询分页


    $scope.findPage=function(page,rows){

        recommendService.findPage(page,rows).success(
            function(response){
                $scope.list=response.rows;
                $scope.paginationConf.totalItems=response.total;// 更新总记录数
            }
        )
    }
    // 新增或者更新
    $scope.save=function(){
        var object;
        if($scope.entity.id==null){
            object=recommendService.save($scope.entity);
        }else{
            object=recommendService.update($scope.entity);
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
        recommendService.findOne(id).success(function(response){
            $scope.entity=response;
        })
    }

    // 删除
    $scope.dele=function(){
        // 获取选中的复选框
        recommendService.dele($scope.selectIds).success(
            function(response){
                if(response.success){
                    $scope.reloadList();// 刷新列表
                }
            }
        );
    }
    // 搜索
    $scope.searchEntity={};

    $scope.search = function(page,rows){
        recommendService.search(page,rows,$scope.searchEntity).success(function(response){
            $scope.list = response.obj;
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