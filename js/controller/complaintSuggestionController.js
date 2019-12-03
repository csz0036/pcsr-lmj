app.controller("complaintSuggestionController",function($scope,complaintSuggestionService){

			var entity = $scope.entity={};
			
			console.log(entity)
			// 新增或者更新
			$scope.save=function(){
				entity.errorMsg = {};
				if(entity.email == undefined){
					entity.errorMsg.email = '请输入邮箱';
					return; 
				}else if(!entity.email.match(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/)){
					entity.errorMsg.email = '请输入正确的邮箱';
					return; 
				}else if(entity.userName == undefined){
					entity.errorMsg.userName = '请输入您的姓名';
					return; 
				}else if(entity.phone == undefined){
					entity.errorMsg.phone = '请输入您的手机号码';
					return; 
				}else if(!entity.phone.match(/^[1][0-9][0-9]{9}$/)){
					entity.errorMsg.phone = '请输入正确的手机号码';
					return; 
				}else if(entity.proposal == undefined){
					entity.errorMsg.proposal = '请输入您的建议';
					return;
				}else{
					complaintSuggestionService.save($scope.entity).success(
						function(response){
							if(response.success){
								layer.msg('提交成功');
								location.reload() 
							}else{
								console.log(response.message);
							}
						}
					)
				}
			}
			
})