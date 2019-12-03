
app.controller("enterpriseServiceController",function($scope,enterpriseServiceService){
		
			var entity = $scope.entity={};

			var hash=window.location.hash||'';



			layui.use(['form'], function(){
				var form = layui.form;
				if(hash == "#tab1"){
					form.val("enterpriseOrders",{
						"applyItem":"高级人才寻访"
					});
				}else if(hash == "#tab2"){
					form.val("enterpriseOrders",{
						"applyItem":"顶级人才寻访"
					});
				}else if(hash == "#tab3"){
					form.val("enterpriseOrders",{
						"applyItem":"招聘服务外包流程"
					});
				}else if(hash == "#tab4"){
					form.val("enterpriseOrders",{
						"applyItem":"人才背景调查"
					});
				}else if(hash == "#tab5"){
					form.val("enterpriseOrders",{
						"applyItem":"薪酬调查服务"
					});
				}else{
					form.val("enterpriseOrders",{
						"applyItem":"高级人才寻访"
					});
				};
				$(".doServices .btn a").click(function(){
					var index = $(this).index();
					if(index == 0){
						form.val("enterpriseOrders",{
							"applyItem":"高级人才寻访"
						});
					}else if(index == 1){
						form.val("enterpriseOrders",{
							"applyItem":"顶级人才寻访"
						});
					}else if(index == 2){
						form.val("enterpriseOrders",{
							"applyItem":"招聘服务外包流程"
						});
					}else if(index == 3){
						form.val("enterpriseOrders",{
							"applyItem":"人才背景调查"
						});
					}else if(index == 4){
						form.val("enterpriseOrders",{
							"applyItem":"薪酬调查服务"
						});
					}
				})
			});
			// 新增或者更新
			$scope.save=function(){
				entity.applyItem = $(".enterpriseOrders .from select").val();
				entity.errorMsg = {};
				if(entity.applyItem == ""){
					entity.errorMsg.applyItem = '请选择申请项目';
					return; 
				}else if(entity.corporateName == undefined){
					entity.errorMsg.corporateName = '请输入公司名称';
				}else if(entity.contacts == undefined){
					entity.errorMsg.contacts = '请输入联系人';
					return; 
				}else if(entity.contactsPhone == undefined){
					entity.errorMsg.contactsPhone = '请输入联系人手机号码';
					return; 
				}else if(!entity.contactsPhone.match(/^[1][0-9][0-9]{9}$/)){
					entity.errorMsg.contactsPhone = '请输入正确的手机号码';
					return; 
				}else{
					var object;
					if($scope.entity.id==null){
						object=enterpriseServiceService.save($scope.entity);
					}else{
						object=enterpriseServiceService.update($scope.entity);
					}
					object.success(
						function(response){
							if(response.success){
								console.log(response);
								layer.msg('提交成功');
								location.reload();
							}else{
								console.log(response.message);
							}
						}
					)
				}
				
			}
			
})