
app.controller("soiroccollegeController",function($scope,soirocCollegeService){
    
    var entity = $scope.entity={};
    entity.applyItem = "";
    layui.use('form', function(){
        var form = layui.form;
        form.on('select(applyItem)', function(data){
            entity.applyItem = data.value;
        });
    });
    // 新增或者更新
    $scope.save=function(){
        entity.errorMsg = {};
        if(entity.applyItem == ""){
            entity.errorMsg.applyItem = '请选择申请项目';
            return; 
        }else if(entity.contacts == undefined){
            entity.errorMsg.contacts = '请输入联系人';
            return; 
        }else if(entity.contactsPhone == undefined){
            entity.errorMsg.contactsPhone = '请输入手机号码';
            return; 
        }else if(!entity.contactsPhone.match(/^[1][0-9][0-9]{9}$/)){
            entity.errorMsg.contactsPhone = '请输入正确的手机号码';
            return; 
        }else{
            delete $scope.entity.errorMsg;
            soirocCollegeService.add($scope.entity).success(function(response){
                if(response.success){
                    layer.msg("提交成功",function(){
                        location.reload();
                    });
                }else{
                    console.log(response.message);
                }
            })

            // var object;
            // object=joinSoirocService.add($scope.entity);
            // object.success(
            //     function(response){
            //         if(response.success){
            //             console.log(response);
            //             
            //             $(".addFrom").hide();
            //             $(".table").show();
                       
            //         }else{
            //             console.log(response.message);
            //         }
            //     }
            // )
        }
        
    }
    
})