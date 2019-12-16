app.controller("indexController",function($scope,indexService,newsInformationService,personService){
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
    

    $scope.areaData = {};
    $scope.sexDate = {};
    $scope.eduCation = {};
    personService.getParams().success(function (response) {
        if (response.success) {
            // console.log(response)
            $scope.areaData = response.obj.b_city;
            $scope.sexDate = response.obj.gender2;
            $scope.eduCation = response.obj.qualifications;
        }
    })

    $scope.positionList=[{
        estimateHeadhuntingFee: "10000"
        ,city: "1517"
        ,firstDegree: "00"
        ,gender: "j1_4"
        ,id: 1
        ,maxLimit: "10"
        ,maxSalary: "10"
        ,minLimit: "1"
        ,minSalary: "1"
        ,proId: "8c1637d0-1667-42dd-b698-f5f45381e3d6"
        ,proName: "腾讯"
        ,userId: 106653
        ,visitNumber: 1103
    },{
        estimateHeadhuntingFee: "10000"
        ,city: "1517"
        ,firstDegree: "00"
        ,gender: "j1_4"
        ,id: 1
        ,maxLimit: "10"
        ,maxSalary: "10"
        ,minLimit: "1"
        ,minSalary: "1"
        ,proId: "8c1637d0-1667-42dd-b698-f5f45381e3d6"
        ,proName: "阿里巴巴"
        ,userId: 106653
        ,visitNumber: 1103
    },{
        estimateHeadhuntingFee: "10000"
        ,city: "1517"
        ,firstDegree: "00"
        ,gender: "j1_4"
        ,id: 1
        ,maxLimit: "10"
        ,maxSalary: "10"
        ,minLimit: "1"
        ,minSalary: "1"
        ,proId: "8c1637d0-1667-42dd-b698-f5f45381e3d6"
        ,proName: "百度"
        ,userId: 106653
        ,visitNumber: 1103
    },{
        estimateHeadhuntingFee: "10000"
        ,city: "1517"
        ,firstDegree: "00"
        ,gender: "j1_4"
        ,id: 1
        ,maxLimit: "10"
        ,maxSalary: "10"
        ,minLimit: "1"
        ,minSalary: "1"
        ,proId: "8c1637d0-1667-42dd-b698-f5f45381e3d6"
        ,proName: "每日优鲜"
        ,userId: 106653
        ,visitNumber: 1103
    },{
        estimateHeadhuntingFee: "10000"
        ,city: "1517"
        ,firstDegree: "00"
        ,gender: "j1_4"
        ,id: 1
        ,maxLimit: "10"
        ,maxSalary: "10"
        ,minLimit: "1"
        ,minSalary: "1"
        ,proId: "8c1637d0-1667-42dd-b698-f5f45381e3d6"
        ,proName: "水滴"
        ,userId: 106653
        ,visitNumber: 1103
    }]
   
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
    $scope.searchEntity={
        type : "industry"
    };

    $scope.search = function(page,rows){
        indexService.search(page,rows,$scope.searchEntity).success(function(response){
            if(!response.obj) return
            if(response.obj.rows.length<=4){
                $scope.list = response.obj.rows;
            } else {
                $scope.list = response.obj.rows.slice(0,4);

            }
        })
    }

    $scope.highEndJobs = function(id){
        console.log('highEndJobs')
        $scope.searchEntity.position = id;
        $scope.searchEntity.type = "position";
        $scope.search(1,4,$scope.searchEntity);
    }

    /**
     * 左侧职位选择
     */
    $scope.topPostsObjInde = 0;
    $scope.topPosts = function(id,index){
        console.log('左侧职位选择')
        $scope.searchEntity.position = id;
        $scope.searchEntity.type = "industry";
        $scope.topPostsObjInde = index
        $scope.search($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
    }

    
    $scope.reloadList = function() {
        //切换页码
        console.log('切换页码')
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

    // 搜索
    $scope.iNewsSearchEntity = {
        type : "industry"
    };
    //获取新闻列表
    $scope.iNews = function(title,index){
        console.log('获取新闻列表')
        $scope.iNewsSearchEntity.fileType = title;
        $scope.index = index;
        newsInformationService.search(1,3,$scope.iNewsSearchEntity).success(function(response){
            $scope.newslist = response.obj.rows || [];
        });
    }

})
