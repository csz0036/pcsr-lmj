app.controller("indexController",function($scope,indexService,newsInformationService){


    $scope.topPosts = [{"487181981":"CEO"},{"472378393":"COO"},{"960493450":"CFO"},{"711249516":"CTO"},{"806634754":"CIO"},{"388036864":"CHO"},{"820680760":"总裁"},{"341789050":"副总裁"},{"937140505":"总经理"},{"00":"其他"}];

    $scope.highEndJobs = [{"106":"地产"},{"102":"互联网"},{"130":"汽车"},{"100019":"金融"},{"122":"文旅"},{"2275058":"酒店"},{"70065790":"儿童"},{"318023868":"商业"},{"188876":"物业"},{"330372959":"人力"},{"349421233":"财审"},{"000000":"其他"}];
    $scope.topPostsObj =[];
    $scope.highEndJobsObj = [];

    $scope.newsTitle = [{'title':'商壤新闻'},{'title':'猎场分享'},{'title':'职场管理'}]

    // indexService.getUserInfo().success(function(response) {
    //     console.log(response)
	// 	// if (response.success) {
			
	// 	// }
		
	// })
   
    for(var key in $scope.topPosts){
        for(var i in $scope.topPosts[key]){
            var obj = {};
            obj.id = i;
            obj.name = $scope.topPosts[key][i];
            $scope.topPostsObj.push(obj);
        }
    }
    for(var key in $scope.highEndJobs){
        for(var i in $scope.highEndJobs[key]){
            var obj = {};
            obj.id = i;
            obj.name = $scope.highEndJobs[key][i];
            $scope.highEndJobsObj.push(obj);
        }
    }
    // 搜索
    $scope.searchEntity={};

    $scope.search = function(page,rows,id){

        indexService.search(page,rows,id,$scope.searchEntity).success(function(response){
            console.log(response.obj)
            $scope.list = response.obj.rows;
        })
    }

    $scope.highEndJobs = function(id){
        $scope.searchEntity.position = id;
        $scope.searchEntity.type = "position";
        $scope.search(1,4);
    }


    $scope.topPosts = function(id){
        $scope.searchEntity.position = id;
        $scope.searchEntity.type = "industry";
        $scope.search($scope.paginationConf.currentPage,
            $scope.paginationConf.itemsPerPage);
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

    // 搜索
    $scope.iNewsSearchEntity = {};
    //获取新闻列表
    $scope.iNews = function(title,index){
        $scope.iNewsSearchEntity.fileType = title;
        $scope.index = index;
        newsInformationService.search(1,3,$scope.iNewsSearchEntity).success(function(response){
            $scope.newslist = response.obj.rows;
        });
    }

})
