app.controller("joinSoirocController",function($scope,joinSoirocService){
    // $scope.flag=true;
    $scope.initData = {
        oinSoiroc:[]
    }
    var entity = $scope.entity={};
    $scope.oinSoiroc = function (rows,page) {
		joinSoirocService.search(rows,page).success(function (response) {
			if (response.success) {
                console.log(response.obj.rows)
				$scope.initData.oinSoiroc.push(response.obj.rows)
			}
		})
    }
    // if(localStorage.flags="1"){
    //     $scope.flag=false;
    //     $scope.yingpins=function(){
            
    //     }
    // }
   
    // 新增或者更新
    $scope.save=function(){
        var _radio = $('input:radio[name="gender"]:checked').val();
        entity.gender = _radio;
        entity.errorMsg = {};
        if(entity.username == undefined){
            entity.errorMsg.username = '请输入姓名';
            return; 
        }else if(entity.gender == undefined){
            entity.errorMsg.gender = '请选择性别';
            return; 
        }else if(entity.phone == undefined){
            entity.errorMsg.phone = '请输入手机号码';
            return; 
        }else if(!entity.phone.match(/^[1][0-9][0-9]{9}$/)){
            entity.errorMsg.phone = '请输入正确的手机号码';
            return; 
        }else if(entity.recentCompany == undefined){
            entity.errorMsg.recentCompany = '请输入最近公司';
            return; 
        }else if(entity.recentPosts == undefined){
            entity.errorMsg.recentPosts = '请输入最近职位';
            return; 
        }else if(entity.currentSalary == undefined){
            entity.errorMsg.currentSalary = '请输入目前年薪';
            return; 
        }else if(entity.currentIndustry == undefined){
            entity.errorMsg.currentIndustry = '请输入现在行业';
            return; 
        }else{
            console.log($scope.entity);
            var object;
            object=joinSoirocService.add($scope.entity);
            object.success(
                function(response){
                    if(response.success){
                        window.localStorage.setItem("flags",1)
                        console.log(response);
                        
                        $(".addFrom").hide();
                        $(".table").show();
                       
                    }else{
                        console.log(response.message);
                    }
                }
            )
        }
        
    }
    
})