app.controller("personController",function($scope,personService,usersService){

    //修改简历名称
    $scope.updatePersonName = function(pName){
        if(!pName){
            layer.msg('简历名称不能为空')
            return
        }
        $scope.editData.personName=pName;
        if(!getUrlParam("preson")){
            var param = {
                personName: pName,
                personId: $scope.editData.personId
            }
            personService.changePersonName(param).success(
                function(){
                    layer.msg('修改简历名称成功')
                    // var personArr = $scope.persons;
                    // for (var i= 0;i < personArr.length;i++){
                    //     if(personArr[i].personId == $scope.editData.personId){
                    //         personArr[i].personName = pName
                    //     }
                    // }
                    window.location.reload()
                }
            )
        }
    }
    $scope.persons =[];
    $scope.flaglast =false;
    $scope.initData = {};
    $scope.editData = {};
    $scope.saveProName = '';
    $scope.shieldCompanyList = [
    ]
    $scope.incumbencyList = [
        "CEO",
		'地产',
		'互联网',
		'汽车',
		'金融',
		'文旅',
		'酒店',
		'教育',
		'商业',
        '物业',
        '其他'
    ]
    //选择简历信息 初始化数
    $scope.selectPersons = function(){

        var personId = $scope.editData.personId;
        var personArr = $scope.persons;

        for (var i= 0;i < personArr.length;i++){
            if(personArr[i].personId == personId){
                initData($scope.initData,personArr[i]);
                console.log($scope.initData);
                $scope.pName = $scope.initData.personName || $scope.initData.chineseName

            }
        }
    }

    $scope.getShieldCompany = function(){
        personService.getShieldCompany().success()
    }

    $scope.saveShieldCompany = function(){
        console.log('保存屏蔽公司',$scope.saveProName)
        var param = {
            proName: $scope.saveProName
        }
        personService.saveShieldCompany(param).success(
            layer.msg('屏蔽成功')
        )
    }

    $scope.userName=''
    $scope.watchTimes=''

    /**获取当前用户的所有简历信息*/
    $scope.personList = function(){
        personService.personList().success(
            function(res){
                if(res.obj.length == 0){
                    alert("请添加简历");
                    window.location.href = '../../pages/简历-详情.html?preson=null'
                    return;
                }
                res.obj.forEach(item=>{
                    if(item.personName == ''){
                        item.personName = item.chineseName
                    }
                })
                $scope.persons = res.obj;
                initData($scope.initData,res.obj[0]);

                usersService.getCurrentUser().success(function(res){
                    $scope.userName = res.obj.username
                    $scope.watchTimes = Math.floor(Math.random() * 100)
                });
               
                if(getUrlParam("preson") == "null"){
                    $scope.flaglast=false
                    usersService.getCurrentUser().success(function(res){
                        var number = $scope.persons.length + 1;
                        $scope.pName = res.obj.username+"的简历-"+number;
                        $scope.editData.personName= res.obj.username+"的简历-"+number;
                    });
                }else{
                    $scope.flaglast=true
                    initData($scope.editData,res.obj[0]);



                }
                setTimeout( () => {$scope.form.render();},0);
            }
           
        )

        personService.getShieldCompany().success(
            function(res){
                $scope.shieldCompanyList = res.obj
            }
        )
    }


    var initData = function(entitydata ,resultdata){
        entitydata.personId = resultdata.personId;
        entitydata.chineseName = resultdata.chineseName;
        entitydata.personName = resultdata.personName || resultdata.chineseName;
        $scope.pName = entitydata.personName || resultdata.chineseName
        if(resultdata.phone == null){
            entitydata.phone = [];
        }else{
            entitydata.phone = resultdata.phone;
        }
        entitydata.headPortrait = resultdata.headPortrait;
        entitydata.gender = resultdata.gender;
        entitydata.city = resultdata.city;
        entitydata.birthday = resultdata.birthday;
        entitydata.recentUnit = resultdata.recentUnit;
        entitydata.qualification = resultdata.qualification;
        entitydata.recentPosition = resultdata.recentPosition;
        entitydata.personState = resultdata.personState;
        entitydata.incumbency = resultdata.incumbency;
        entitydata.industry = resultdata.industry;
        entitydata.timetype = resultdata.timetype;
        entitydata.expyearsal = resultdata.expyearsal;
        entitydata.hopeIndustry = resultdata.hopeIndustry;
        entitydata.household = resultdata.household;
        entitydata.houseProject = resultdata.houseProject;
        if(resultdata.email == null){
            entitydata.email = [];
        }else{
            entitydata.email = resultdata.email;
        }
        entitydata.height = resultdata.height;
        entitydata.country = resultdata.country;
        entitydata.jobLeavl = resultdata.jobLeavl;
        entitydata.origin = resultdata.origin;
        entitydata.curyearsal = resultdata.curyearsal;
        entitydata.politics = resultdata.politics;
        entitydata.highlyEducated = resultdata.highlyEducated;
        entitydata.maritalStatus = resultdata.maritalStatus;
        entitydata.certtype = resultdata.certtype;
        entitydata.overseasExperience = resultdata.overseasExperience;
        entitydata.certcode = resultdata.certcode;
        if(resultdata.coverletter == null){
            entitydata.coverletter = [];
        }else{
            entitydata.coverletter = resultdata.coverletter;
        }

        if(resultdata.familymember == null){
            entitydata.familymember = [];
        }else{
            entitydata.familymember = resultdata.familymember;
        }

        if(resultdata.resume == null){
            entitydata.resume = [];
        }else{
            entitydata.resume = resultdata.resume;
        }

        if(resultdata.languageExp == null){
            entitydata.languageExp = [{
                languageType:'',
                languageLevel:''
            }];
        }else{
            entitydata.languageExp = resultdata.languageExp;
        }

        if(resultdata.eduBackground == null){
            entitydata.eduBackground = [{
                eduStartTime:'',
                eduEndTime:'',
                soFar:'',
                eduType:'',
                eduSchoolName:'',
                eduValue:{
                        // 专业名称
                        '572266df-2bd8-4a46-be10-fd5f595bc4c4':'',
                        // 是否统招
                        '8ad30b5b-dfaa-43ba-8968-7535eccc28c8':'',
                        // 学历/学位
                        '0b8b0f62-7d06-4b2f-8ef7-6ad703d9d67b':''
            }
        }];
        }else{
            entitydata.eduBackground = resultdata.eduBackground;
        }

        if(resultdata.projectExp == null){
            entitydata.projectExp = [
                {
                    proIntoTime:'',
                    proOutTime:'',
                    sofar:'',
                    proName:'',
                    projectExpValue:{
                        '77a7441a-23b4-4b7c-aa2c-269185db1c33':'',
                        '238926b5-bf7f-4b88-b7fb-ce1c9caf234c':'',
                        'e56dbbc6-a86b-437d-9de5-241929df991a':'',
                        'dbf1b67f-ac70-495a-be14-aaf08daa8bfd':'',
                        '7099a588-7dd1-4fa7-aed5-64f096e618dc':''
                    },
                    path:'',
                    yPath:'',
                    kPath:'',
                    cos:'',
                    proDescription:''
                }
            ];
        }else{
            entitydata.projectExp = resultdata.projectExp;
        }

        if(resultdata.workExp == null){
            entitydata.workExp = [
                {
                    workStartTime:'',
                    workEndTime:'',
                    workComname:'',
                    workExpValue:{
                        'ddf4afda-9f15-41fd-ae1d-38bfcc50fc44':'',
                        'efdd270f-fac2-46be-9a96-6990b919f78e':'',
                        'fb894fdb-8ae6-4f72-807c-c8476c7543cb':'',
                        '815374f3-5cb7-48dd-8783-52308a7c8217':''
                    },
                    mainDuty:'',
                    workBussdesc:'',
                    exitText:''
                }
            ];
        }else{
            entitydata.workExp = resultdata.workExp;
        }
        if(resultdata.majorQualify == null){
            entitydata.majorQualify = [{
                papersName:'',
                getTime:'',
                issuingAgency:''
            }];
        }else{
            entitydata.majorQualify = resultdata.majorQualify;
        }

        if(resultdata.personalfile == null){
            entitydata.personalfile = [];
        }else{
            entitydata.personalfile = resultdata.personalfile;
        }

        if(resultdata.note == null){
            entitydata.note = [];
        }else{
            entitydata.note = resultdata.note;
        }

        if(resultdata.headPortrait == null){
            entitydata.headPortrait = [];
        }else{
            entitydata.headPortrait = resultdata.headPortrait; 
        }
        console.log('头像11111',$scope.initData.headPortrait[0])
    }

	// $scope.editData = {}
	// $scope.entity={
	// 	phone:[123123],
	// 	email:[],
	// 	coverletter:[],//求职信
	// 	familymember:[],//家庭成员
	// 	resume:[],//概要
	// 	languageExp:[],//语言背景
	// 	edubackground:[],//教育背景
	// 	projectExp:[],//项目经验
	// 	workExp:[],//工作经历
	// 	majorqualify:[],//证件
	// 	personalfile:[],//附件
	// 	note:[],//
	// 	headPortrait:[]//头像
	// }
	// 添加工作经历
	$scope.addWorkExpRow = function(){
        console.log('新增')
		$scope.editData.workExp.push({
			workStartTime:'',
			workEndTime:'',
			workComname:'',
			workExpValue:{
				'ddf4afda-9f15-41fd-ae1d-38bfcc50fc44':'',
				'efdd270f-fac2-46be-9a96-6990b919f78e':'',
				'fb894fdb-8ae6-4f72-807c-c8476c7543cb':'',
                '815374f3-5cb7-48dd-8783-52308a7c8217':''
			},
			mainDuty:'',
			workBussdesc:'',
			exitText:''
		});
		layui.use(['laydate','form','upload'], function(){
            var laydate = layui.laydate,
                form = layui.form,
                upload = layui.upload;
                function timeAdd(){
                    lay('.timePicker1').each(function() {
                        laydate.render({
                            elem : this,
                            trigger : 'click',
                            done:function(value,date,endDate){
                                $scope.editData.workExp[$scope.editData.workExp.length-1].workStartTime = value
                            }
                        });
                    });
                    lay('.timePicker2').each(function() {
                        laydate.render({
                            elem : this,
                            trigger : 'click',
                            done:function(value,date,endDate){
                                $scope.editData.workExp[$scope.editData.workExp.length-1].workEndTime = value
                            }
                        });
                    });
                        

                }
                timeAdd()
                // laydate.render({
                //     elem: '.timePicker' //指定元素
                //     ,theme: '#D23637',
                //     trigger: 'click',
                    // ,change:function(value,date,enddata){
                    //     console.log(value);
                    //     console.log(date);
                    //     console.log(endDate);
                    // }
                // });
        });
        setTimeout( () => {
            $scope.form.render()
            layui.use(['laydate','form','upload'], function(){
                var laydate = layui.laydate,
                    form = layui.form,
                    upload = layui.upload;
                    function timeAdd(){
                        lay('.timePicker1').each(function() {
                            laydate.render({
                                elem : this,
                                trigger : 'click',
                                done:function(value,date,endDate){
                                    $scope.editData.workExp[$scope.editData.workExp.length-1].workStartTime = value
                                }
                            });
                        });
                        lay('.timePicker2').each(function() {
                            laydate.render({
                                elem : this,
                                trigger : 'click',
                                done:function(value,date,endDate){
                                    $scope.editData.workExp[$scope.editData.workExp.length-1].workEndTime = value
                                }
                            });
                        });
                    }
                    timeAdd()
            });
            ;},0);
        
		$(".resume-content .edit").css("display","inline-block");

	}
	// 删除工作经历
	$scope.workDelrow = function(index){
		$scope.editData.workExp.splice(index,1)
	}

	// 添加项目经历
	$scope.addProjectExpRow = function(){
		$scope.editData.projectExp.push({
			proIntoTime:'',
			proOutTime:'',
			sofar:'',
			proName:'',
			projectExpValue:{
				'77a7441a-23b4-4b7c-aa2c-269185db1c33':'',
				'238926b5-bf7f-4b88-b7fb-ce1c9caf234c':'',
				'e56dbbc6-a86b-437d-9de5-241929df991a':'',
				'dbf1b67f-ac70-495a-be14-aaf08daa8bfd':'',
				'7099a588-7dd1-4fa7-aed5-64f096e618dc':''
			},
			path:'',
			yPath:'',
			kPath:'',
			cos:'',
			proDescription:''
		});
		console.log($scope.editData.projectExp)
		layui.use(['laydate','form','upload'], function(){
            var laydate = layui.laydate,
                form = layui.form,
                upload = layui.upload;
                function timeAdd(){
                    lay('.timePicker3').each(function() {
                        laydate.render({
                            elem : this,
                            trigger : 'click',
                            done:function(value,date,endDate){
                                $scope.editData.projectExp[$scope.editData.projectExp.length-1].proIntoTime = value
                            }
                        });
                    });
                    lay('.timePicker4').each(function() {
                        laydate.render({
                            elem : this,
                            trigger : 'click',
                            done:function(value,date,endDate){
                                $scope.editData.projectExp[$scope.editData.projectExp.length-1].proOutTime = value
                            }
                        });
                    });
                }
                timeAdd()
                // laydate.render({
                //     elem: '.timePicker' //指定元素
                //     ,theme: '#D23637',
                //     trigger: 'click',
                // });
        });
        
        setTimeout( () => {
            $scope.form.render()
            layui.use(['laydate','form','upload'], function(){
                var laydate = layui.laydate,
                    form = layui.form,
                    upload = layui.upload;
                    function timeAdd(){
                        lay('.timePicker3').each(function() {
                            laydate.render({
                                elem : this,
                                trigger : 'click',
                                done:function(value,date,endDate){
                                    $scope.editData.projectExp[$scope.editData.projectExp.length-1].proIntoTime = value
                                }
                            });
                        });
                        lay('.timePicker4').each(function() {
                            laydate.render({
                                elem : this,
                                trigger : 'click',
                                done:function(value,date,endDate){
                                    $scope.editData.projectExp[$scope.editData.projectExp.length-1].proOutTime = value
                                }
                            });
                        });
                    }
                    timeAdd()
            });
            ;},0);
		$(".resume-content .edit").show();
	}
	// 删除项目经历
	$scope.projectDelrow = function(index){
		$scope.editData.projectExp.splice(index,1)
	}
	// 添加教育背景
	$scope.addeduBackgroundRow = function(){
		$scope.editData.eduBackground.push({
			eduStartTime:'',
			eduEndTime:'',
			soFar:'',
			eduType:'',
			eduSchoolName:'',
			eduValue:{
				// 专业名称
				'572266df-2bd8-4a46-be10-fd5f595bc4c4':'',
				// 是否统招
				'8ad30b5b-dfaa-43ba-8968-7535eccc28c8':'',
				// 学历/学位
				'0b8b0f62-7d06-4b2f-8ef7-6ad703d9d67b':''
			}
		});
		layui.use(['laydate','form','upload'], function(){
            var laydate = layui.laydate,
                form = layui.form,
                upload = layui.upload;
                // laydate.render({
                //     elem: '.timePicker' //指定元素
                //     ,theme: '#D23637',
                //     trigger: 'click',
                // });
                function timeAdd(){
                    lay('.timePicker5').each(function() {
                        laydate.render({
                            elem : this,
                            trigger : 'click',
                            done:function(value,date,endDate){
                                $scope.editData.eduBackground[$scope.editData.eduBackground.length-1].eduStartTime = value
                            }
                        });
                    });
                    lay('.timePicker6').each(function() {
                        laydate.render({
                            elem : this,
                            trigger : 'click',
                            done:function(value,date,endDate){
                                $scope.editData.eduBackground[$scope.editData.eduBackground.length-1].eduEndTime = value
                            }
                        });
                    });
                }
                timeAdd()
        });
        setTimeout( () => {
            $scope.form.render()
            layui.use(['laydate','form','upload'], function(){
                var laydate = layui.laydate,
                    form = layui.form,
                    upload = layui.upload;
                    function timeAdd(){
                        lay('.timePicker5').each(function() {
                            laydate.render({
                                elem : this,
                                trigger : 'click',
                                done:function(value,date,endDate){
                                    $scope.editData.eduBackground[$scope.editData.eduBackground.length-1].eduStartTime = value
                                }
                            });
                        });
                        lay('.timePicker6').each(function() {
                            laydate.render({
                                elem : this,
                                trigger : 'click',
                                done:function(value,date,endDate){
                                    $scope.editData.eduBackground[$scope.editData.eduBackground.length-1].eduEndTime = value
                                }
                            });
                        });
                    }
                    timeAdd()
            });
            ;},0);
		$(".resume-content .edit").show();
	}
	// 删除教育背景
	$scope.eduBackgroundDelrow = function(index){
		$scope.editData.eduBackground.splice(index,1)
	}
	// 添加教育背景
	$scope.addlanguageExpRow = function(){
		$scope.editData.languageExp.push({
			languageType:'',
			languageLevel:''
		});
		layui.use(['laydate','form','upload'], function(){
            var laydate = layui.laydate,
                form = layui.form,
                upload = layui.upload;
                // laydate.render({
                //     elem: '.timePicker' //指定元素
                //     ,theme: '#D23637',
                //     trigger: 'click',
                // });
                function timeAdd(){
                    lay('.timePicker').each(function() {
                        laydate.render({
                            elem : this,
                            trigger : 'click'
                        });
                    });
                }
                timeAdd()
        });
        setTimeout( () => {
            $scope.form.render()
            layui.use(['laydate','form','upload'], function(){
                var laydate = layui.laydate,
                    form = layui.form,
                    upload = layui.upload;
                    function timeAdd(){
                        lay('.timePicker').each(function() {
                            laydate.render({
                                elem : this,
                                trigger : 'click'
                            });
                        });
                    }
                    timeAdd()
            });
            ;},0);
		$(".resume-content .edit").show();
	}
	// 删除教育背景
	$scope.languageExpDelrow = function(index){
		$scope.editData.languageExp.splice(index,1)
	}
	// 添加教育背景
	$scope.addmajorQualifyRow = function(){
		$scope.editData.majorQualify.push({
			eduStartTime:'',
			eduEndTime:'',
			soFar:'',
			eduType:'',
			eduSchoolName:'',
			eduValue:{
				// 专业名称
				'572266df-2bd8-4a46-be10-fd5f595bc4c4':'',
				// 是否统招
				'8ad30b5b-dfaa-43ba-8968-7535eccc28c8':'',
				// 学历/学位
				'0b8b0f62-7d06-4b2f-8ef7-6ad703d9d67b':''
			}
		});
		layui.use(['laydate','form','upload'], function(){
            var laydate = layui.laydate,
                form = layui.form,
                upload = layui.upload;
                // laydate.render({
                //     elem: '.timePicker' //指定元素
                //     ,theme: '#D23637',
                //     trigger: 'click',
                // });
                function timeAdd(){
                    lay('.timePicker').each(function() {
                        laydate.render({
                            elem : this,
                            trigger : 'click'
                        });
                    });
                }
                timeAdd()
        });
        setTimeout( () => {
            $scope.form.render()
            layui.use(['laydate','form','upload'], function(){
                var laydate = layui.laydate,
                    form = layui.form,
                    upload = layui.upload;
                    function timeAdd(){
                        lay('.timePicker').each(function() {
                            laydate.render({
                                elem : this,
                                trigger : 'click'
                            });
                        });
                    }
                    timeAdd()
            });
            ;},0);
		$(".resume-content .edit").show();
	}
	// 删除教育背景
	$scope.majorQualifyDelrow = function(index){
		$scope.editData.majorQualify.splice(index,1)
	}



	// 查询分页
	$scope.findPage=function(page,rows){
	personService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;
				$scope.paginationConf.totalItems=response.total;// 更新总记录数
			}
		)
	}

	function funcUrlDel(name){
		var loca = window.location;
		var baseUrl = loca.origin + loca.pathname + "?";
		var query = loca.search.substr(1);
		if (query.indexOf(name)>-1) {
			var obj = {}
			var arr = query.split("&");
			for (var i = 0; i < arr.length; i++) {
				arr[i] = arr[i].split("=");
				obj[arr[i][0]] = arr[i][1];
			};
			delete obj[name];
			var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
			window.location.href = url;
		};
	}

	// 编辑
	$scope.edit = function(){
        $scope.flaglast=true
		$scope.editData = JSON.parse(JSON.stringify($scope.initData))
		setTimeout( () => {$scope.form.render();},0);

	}
	// 取消编辑
	$scope.cancel = function(){
        // console.log(111);
		$scope.editData = {}
        let location_ = window.location.href.split('.html');
        if(location_[1]){
            window.location.href = "../../pages/简历-详情.html"
        }
    }
    
    // console.log(222);
    layui.use('form', function(){
        var form = layui.form;
        form.on('radio(genderRadio)', function (data) {
            $scope.editData.gender = data.value
            console.log('性别',$scope.editData.gender)
        })
    });

	// 新增或者更新
	$scope.save=function(){
		if(getUrlParam("preson") == "null"){
			funcUrlDel('preson');
			return;
        }
        if($scope.editData.chineseName !== '') {
            if($scope.editData.phone.length != 0 && (/^1[3456789]\d{9}$/.test($scope.editData.phone))) {
                if($scope.editData.gender !== ''){
                    if($scope.editData.city !== ''){
                        if($scope.editData.recentPosition !== ''){
                            if($scope.editData.incumbency !== ''){
                                if($scope.editData.industry !== ''){
                                    $scope.editData.headPortrait[0] =  $scope.personHeadImg
                                    personService.save($scope.editData).success(
                                        function(response){
                                            if(response.success){
                                                layer.msg("保存成功")
                                                window.location.href = "../../pages/简历-详情.html"
                                            }else{
                                                layer.msg("保存失败")
                                                console.log(response.message);
                                            }
                                        },
                                         $scope.initData = $scope.editData
                                     )
                                }else{
                                    layer.msg("现在行业不能为空")
                                }
                            }else{
                                layer.msg("现属职能不能为空")
                            }
                            
                        }else{
                            layer.msg("最近职位不能为空")
                        }
                       
                    }else{
                        layer.msg("城市不能为空")
                    }
                }else{
                    alert('性别不能为空')
                }  
            }else {
                layer.msg("电话号码输入有误")
            }
        }else{
            layer.msg("姓名不能为空")
        }
		
		// $scope.editData = {}


	}
	// 立即提交
	$scope.submit=function(){
		console.log($scope.editData)
        if($scope.editData.chineseName !== '') {
            if($scope.editData.phone.length != 0 && (/^1[3456789]\d{9}$/.test($scope.editData.phone))) {
                if($scope.editData.gender !== ''){
                    if($scope.editData.city !== ''){
                        if($scope.editData.recentPosition !== ''){
                            if($scope.editData.incumbency !== ''){
                                if($scope.editData.industry !== ''){

                                    $scope.editData.headPortrait[0] =  $scope.personHeadImg

                                    personService.save($scope.editData).success(
                                        function(response){
                                            if(response.success){
                                                layer.msg("保存成功")
                                                window.location.href = "../../pages/简历-详情.html"
                                            }else{
                                                layer.msg("保存失败")
                                                console.log(response.message);
                                            }
                                        },
                                         $scope.initData = $scope.editData
                                     )
                                }else{
                                    layer.msg("现在行业不能为空")
                                }
                            }else{
                                layer.msg("现属职能不能为空")
                            }
                            
                        }else{
                            layer.msg("最近职位不能为空")
                        }
                       
                    }else{
                        layer.msg("城市不能为空")
                    }
                }else{
                    alert('性别不能为空')
                }  
            }else {
                layer.msg("电话号码输入有误")
            }
        }else{
            layer.msg("姓名不能为空")
        }
		
		// $scope.editData = {}


	}
    // personService.personList().success(function(response) {
	// 	if (response.success) {
	// 		for(var i in response.obj.position){
	// 			console.log(response.obj.position[i])
	// 			// $scope.initData.jobList.push({'id':'','name':response.obj.position[i],'list': []});//更新智能
	// 		}
	// 	}
	// })
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r != null) return unescape(r[2]); return null; //返回参数值
	}
	// 初始化页面
	$scope.initPage = function(){
        $scope.initData ={};
		if(getUrlParam("preson") == "null"){
			personService.getParams().success(
				function(res){
					if(res.success){
						$scope.initData.params = res.obj;
					}
				}
            )
            
			$(".resume-content .edit-exhibition").hide();
			$(".resume-content .edit").show();
			$(".bj").trigger("click");
            $scope.initDataAdd( $scope.editData );
		}else{
			personService.getParams().success(
				function(res){
					if(res.success){
						$scope.initData.params = res.obj;
					}
				}
			)
		}
		layui.use(['laydate','form','upload'], function(){
            var laydate = layui.laydate,
			form = layui.form,
			upload = layui.upload;
			// laydate.render({
			// 	elem: '.timePicker' //指定元素
            //     ,theme: '#D23637',
            //     trigger: 'click',
            // });
            function timeAdd(){
                lay('.timePicker1').each(function() {
                    laydate.render({
                        elem : this,
                        trigger : 'click',
                        done:function(value,date,endDate){
                            $scope.editData.workExp[$scope.editData.workExp.length-1].workStartTime = value
                        }
                    });
                });
                lay('.timePicker2').each(function() {
                    laydate.render({
                        elem : this,
                        trigger : 'click',
                        done:function(value,date,endDate){
                            $scope.editData.workExp[$scope.editData.workExp.length-1].workEndTime = value
                        }
                    });
                });
                lay('.timePicker3').each(function() {
                    laydate.render({
                        elem : this,
                        trigger : 'click',
                        done:function(value,date,endDate){
                            $scope.editData.projectExp[$scope.editData.projectExp.length-1].proIntoTime = value
                        }
                    });
                });
                lay('.timePicker4').each(function() {
                    laydate.render({
                        elem : this,
                        trigger : 'click',
                        done:function(value,date,endDate){
                            $scope.editData.projectExp[$scope.editData.projectExp.length-1].proOutTime = value
                        }
                    });
                });
                lay('.timePicker5').each(function() {
                    laydate.render({
                        elem : this,
                        trigger : 'click',
                        done:function(value,date,endDate){
                            $scope.editData.eduBackground[$scope.editData.eduBackground.length-1].eduStartTime = value
                        }
                    });
                });
                lay('.timePicker6').each(function() {
                    laydate.render({
                        elem : this,
                        trigger : 'click',
                        done:function(value,date,endDate){
                            $scope.editData.eduBackground[$scope.editData.eduBackground.length-1].eduEndTime = value
                        }
                    });
                });
            }
            timeAdd()
            setTimeout( () => {
                $scope.form.render()
                layui.use(['laydate','form','upload'], function(){
                    var laydate = layui.laydate,
                        form = layui.form,
                        upload = layui.upload;
                        function timeAdd(){
                            lay('.timePicker1').each(function() {
                                laydate.render({
                                    elem : this,
                                    trigger : 'click',
                                    done:function(value,date,endDate){
                                        $scope.editData.workExp[$scope.editData.workExp.length-1].workStartTime = value
                                    }
                                });
                            });
                            lay('.timePicker2').each(function() {
                                laydate.render({
                                    elem : this,
                                    trigger : 'click',
                                    done:function(value,date,endDate){
                                        $scope.editData.workExp[$scope.editData.workExp.length-1].workEndTime = value
                                    }
                                });
                            });
                            lay('.timePicker3').each(function() {
                                laydate.render({
                                    elem : this,
                                    trigger : 'click',
                                    done:function(value,date,endDate){
                                        $scope.editData.projectExp[$scope.editData.projectExp.length-1].proIntoTime = value
                                    }
                                });
                            });
                            lay('.timePicker4').each(function() {
                                laydate.render({
                                    elem : this,
                                    trigger : 'click',
                                    done:function(value,date,endDate){
                                        $scope.editData.projectExp[$scope.editData.projectExp.length-1].proOutTime = value
                                    }
                                });
                            });
                            lay('.timePicker5').each(function() {
                                laydate.render({
                                    elem : this,
                                    trigger : 'click',
                                    done:function(value,date,endDate){
                                        $scope.editData.eduBackground[$scope.editData.eduBackground.length-1].eduStartTime = value
                                    }
                                });
                            });
                            lay('.timePicker6').each(function() {
                                laydate.render({
                                    elem : this,
                                    trigger : 'click',
                                    done:function(value,date,endDate){
                                        $scope.editData.eduBackground[$scope.editData.eduBackground.length-1].eduEndTime = value
                                    }
                                });
                            });
                        }
                        timeAdd()
                });
                ;},0);
			$scope.form = form;
			form.on('checkbox(it)', function(data){
				if(data.elem.checked == true){
					$(".resume-content li.it-item").show();
				}else{
					$(".resume-content li.it-item").hide();
				}
			});
			form.on('select', function(data) {
				$(data.elem).change(); // 创建自定义change事件 => 触发NG数据更新
            });
            
			form.on('radio(xzltgw)', function(data){
				console.log(data.elem); //得到radio原始DOM对象
				console.log(data.value); //被点击的radio的value值
				if(data.value == "邀请顾问"){
					$(".opt-lt-adviser .list").eq(0).show().siblings(".list").hide();
					return;
				}else if(data.value == "指定猎头顾问"){
					$(".opt-lt-adviser .list").eq(1).show().siblings(".list").hide();
					return;
				}else{
					$(".opt-lt-adviser .list").hide();
					return;
				};
			});

			// 解析简历上传 执行实例
			var uploadInst = upload.render({
				elem: '#test6' //绑定元素
				,url: '/upload/' //上传接口
				,done: function(res){
				//上传完毕回调
				}
				,error: function(){
				//请求异常回调
				}
			});
			$(".nx-item .z").focus(function(){
				console.log(123);
				var w = parseInt($(".nx-item .w").val()),
					y = parseInt($(".nx-item .y").val()),
					ww = parseInt($(".nx-item .ww").val());
					$(".nx-item .z").val(w*y+ww);
			})

		});
	}












	// 查询单个
	$scope.findOne=function(id){
		personService.findOne(id).success(function(response){
			$scope.entity=response;
		})
	}

	// 删除
	$scope.dele=function(){
			// 获取选中的复选框
			personService.dele($scope.selectIds).success(
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
        console.log("搜索")
		personService.search(page,rows,$scope.searchEntity).success(function(response){
			$scope.list = response.obj.rows;
			$scope.totalRows = response.obj.total;
			$scope.paginationConf.totalItems = response.obj.total;// 更新总记录数
		})
	}

	// 上传头像
	$scope.uImg = function(){
		$('#userimg').click()
    }
    
    // 头像字段
    $scope.personHeadImg = ''

	$scope.onFileSelect = function(file){
        imgFile = file.files[0]
        var reader = new FileReader();
		reader.readAsDataURL(imgFile ); // 将图片转成dataUri
		reader.onload = function(e) {
        //更新图片链接
        console.log('图片资源',$scope.editData)
        $scope.editData.headPortrait[0] = {}
        $scope.editData.headPortrait[0] =  e.target.result;

        var pic1 = imgFile;
        var formData = new FormData();
        // 服务端要求参数是 pic1 
        formData.append('file',pic1);
        $.ajax({
            url:'/api/upload/uploadFile',
            type:'post',
            data:formData,
            cache: false, //上传文件不需要缓存
            processData: false, // 告诉jQuery不要去处理发送的数据
            contentType: false, // 告诉jQuery不要去设置Content-Type请求头
            success:function(data){
                var url = JSON.parse(data.obj).url
                // 设置图片预览功能
                $scope.personHeadImg = 'http://122.14.213.237:8022/' + url
            }
        })

        $scope.$apply();
    }
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

    $scope.initDataAdd = function(entitydata){
        // entitydata.personId = Math.ceil(Math.random()*10000);
        entitydata.chineseName = "";
        console.log(entitydata.chineseName);
        entitydata.personName = "";
        console.log(entitydata.personName);
        entitydata.phone = [];
        entitydata.headPortrait = "";
        entitydata.gender = "";
        entitydata.city = "";
        entitydata.birthday = "";
        entitydata.recentUnit = "";
        entitydata.qualification = "";
        entitydata.recentPosition = "";
        entitydata.personState = "";
        entitydata.incumbency = "";
        entitydata.industry = "";
        entitydata.timetype = "";
        entitydata.expyearsal = "";
        entitydata.hopeIndustry = "";
        entitydata.household = "";
        entitydata.houseProject = "";
        entitydata.email = [];
        entitydata.height = "";
        entitydata.country = "";
        entitydata.jobLeavl = "";
        entitydata.origin = "";
        entitydata.curyearsal = "";
        entitydata.politics = "";
        entitydata.highlyEducated = "";
        entitydata.maritalStatus = "";
        entitydata.certtype = "";
        entitydata.overseasExperience = "";
        entitydata.certcode = "";
        entitydata.coverletter = [];
        entitydata.familymember = [];
        entitydata.resume = [];
        entitydata.languageExp = [{
            languageType:'',
            languageLevel:''
        }];
            entitydata.eduBackground = [{
                eduStartTime:'',
                eduEndTime:'',
                soFar:'',
                eduType:'',
                eduSchoolName:'',
                eduValue:{
                    // 专业名称
                    '572266df-2bd8-4a46-be10-fd5f595bc4c4':'',
                    // 是否统招
                    '8ad30b5b-dfaa-43ba-8968-7535eccc28c8':'',
                    // 学历/学位
                    '0b8b0f62-7d06-4b2f-8ef7-6ad703d9d67b':''
                }
            }];
            entitydata.projectExp = [
                {
                    proIntoTime:'',
                    proOutTime:'',
                    sofar:'',
                    proName:'',
                    projectExpValue:{
                        '77a7441a-23b4-4b7c-aa2c-269185db1c33':'',
                        '238926b5-bf7f-4b88-b7fb-ce1c9caf234c':'',
                        'e56dbbc6-a86b-437d-9de5-241929df991a':'',
                        'dbf1b67f-ac70-495a-be14-aaf08daa8bfd':'',
                        '7099a588-7dd1-4fa7-aed5-64f096e618dc':''
                    },
                    path:'',
                    yPath:'',
                    kPath:'',
                    cos:'',
                    proDescription:''
                }
            ];
            entitydata.workExp = [
                {
                    workStartTime:'',
                    workEndTime:'',
                    workComname:'',
                    workExpValue:{
                        'ddf4afda-9f15-41fd-ae1d-38bfcc50fc44':'',
                        'efdd270f-fac2-46be-9a96-6990b919f78e':'',
                        'fb894fdb-8ae6-4f72-807c-c8476c7543cb':'',
                        '815374f3-5cb7-48dd-8783-52308a7c8217':''
                    },
                    mainDuty:'',
                    workBussdesc:'',
                    exitText:''
                }
            ];
            entitydata.majorQualify = [{
                papersName:'',
                getTime:'',
                issuingAgency:''
            }];
        entitydata.personalfile = [];
        entitydata.note = [];
        entitydata.headPortrait = [];
    }
})
