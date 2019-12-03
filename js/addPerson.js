dataJson 是传递到controller的参数，workExpArr是简历的工作经验（多条），projectExpArr是项目经验（多条）
eduBackgroundArr是教育背景（多条） LanguageExpArr是语言水平（多条） majorQualifyArr专业资格（多条）
注意：给这个js只是给一个样例，强调的事前台掉后台是怎么在传参数，至于里面的细节不需要在意。
"workExpValue" : {
	"ddf4afda-9f15-41fd-ae1d-38bfcc50fc44" : $(".preName").eq(cc).val(),
	"efdd270f-fac2-46be-9a96-6990b919f78e" : $(".superior").eq(cc).val(),
	"fb894fdb-8ae6-4f72-807c-c8476c7543cb" : $(".positionTwo").eq(cc).val(),
	"815374f3-5cb7-48dd-8783-52308a7c8217" : $(".industrySix").eq(cc).val(),
}类似于这样的，你先不用管，我后面会告诉你是什么意思

function params(){
	dataJson = {
		"personId" :$("#personId").val(),
		"broker" :$(".brokerId").val(),
		"agentPersonId":$(".agentPersonId").val(),
		"chineseName":$(".chineseName").val().trim(),//中文名字
		"gender":$("#gender").find("option:selected").val(),
		"birthday":$("#birthday").val().trim(),
		"calendar":$("#birthdayCalendar").find("option:selected").val(),
		"recentUnit":$("#recentUnit").val().trim(),
		"qualification":$("#qualifications").find("option:selected").val(),
		"recentPosition":recentPositionStr,
		"city":$("#nowCity").val(),
		"personState":$("#personState").find("option:selected").val(),
		"expyearsal":$("#expyearsal").val().trim(),
		"hopeIndustry":$("#hopeIndustry").val(),
		"household":$("#household").val(),
		"houseProject":$("#houseProject").val(),
		"incumbency":$("#incumbencyNow").val(),
		"height":$("#height").val().trim(),
		"industry":$("#industryNow").val(),
		"country":$("#country").val(),
		"jobLeavl":$("#jobLeavl").find("option:selected").val(),
		"origin":$("#origin").val(),
		"monthlySalary":$(".monthlySalary").val(),
		"salmonths":$(".monthsaler").find("option:selected").val(),
		"bonus":$(".bonus").val(),
		"annualSalary":$(".annualSalary").val(),
		"politics":$("#politics").find("option:selected").val(),
		"highlyEducated":$("#highlyEducated").find("option:selected").val(),
		"marry":$("#marriage").find("option:selected").val(),
		"certtype":$("#certtype").find("option:selected").val(),
		"overseasExperience":$("#overseasExperience").find("option:selected").val(),
		"certcode":$("#certcode").val().trim(),
		"source":$("#source").val().trim(),
		"type1":type1,
		"patent":$(".patenttalentselect").find("option:selected").val(),
	};
	dataJson.resumeType = resumeType;
	dataJson.HeadPortrait=HeadPortrait;
	dataJson.phone = phoneArr;//电话
	dataJson.email = emailArr;//邮箱
	//工作经验
	var workExpArr = [];
	for(var cc= 0 ; cc<$(".workExperience .addCusInfo").length;cc++){
		var soFar = ""
			if($(".soFar").eq(cc).prop("checked")){
				soFar = "T";
			}
		 var eduJson = {
				"workComname" : $(".workComname").eq(cc).val(),
				"workStartTime" : $(".workStartTime").eq(cc).val(),
				"workEndTime" : $(".workEndTime").eq(cc).val(),
				"soFar" :soFar,
				"workBussdesc" : $(".performanceKey").eq(cc).val(),
				/*"workForm" : "00",*/  //全职兼职
				"mainDuty" :$(".mainRespon").eq(cc).val(),
				"quitExplain" :$(".quitExplain").eq(cc).val(),
				"workExpValue" : {
					"ddf4afda-9f15-41fd-ae1d-38bfcc50fc44" : $(".preName").eq(cc).val(),
					"efdd270f-fac2-46be-9a96-6990b919f78e" : $(".superior").eq(cc).val(),
					"fb894fdb-8ae6-4f72-807c-c8476c7543cb" : $(".positionTwo").eq(cc).val(),
					"815374f3-5cb7-48dd-8783-52308a7c8217" : $(".industrySix").eq(cc).val(),
				},
		  }
		 workExpArr.push(eduJson);
	   }
	 dataJson.workExp = workExpArr;
	 
	 //项目经验
	var projectExpArr = [];
	for(var dd= 0 ; dd<$(".projectExperience .addCusInfo").length;dd++){
		var isIt = ""
		if($(".isIT").eq(dd).prop("checked")){
			isIt = "on";
		}
		var soFar2 = ""
			if($(".soFar2").eq(dd).prop("checked")){
				soFar2 = "T";
			}
		var projectExpJson ={
			"proName" : $(".proName").eq(dd).val(),
			"proIntoTime" :$(".proIntoTime").eq(dd).val(),
			"proOutTime" : $(".proOutTime").eq(dd).val(),
			"soFar" :soFar2,
			"proDescription" : $(".proDescription").eq(dd).val(),
			"projectExpValue" : {
				"77a7441a-23b4-4b7c-aa2c-269185db1c33" : $(".proRole").eq(dd).val(),
				"238926b5-bf7f-4b88-b7fb-ce1c9caf234c" : isIt,
				"e56dbbc6-a86b-437d-9de5-241929df991a" : $(".projectExperience .addCusInfo").eq(dd).find(".software").val(),
				"dbf1b67f-ac70-495a-be14-aaf08daa8bfd" : $(".projectExperience .addCusInfo").eq(dd).find(".hardware").val(),
				"7099a588-7dd1-4fa7-aed5-64f096e618dc" : $(".projectExperience .addCusInfo").eq(dd).find(".development").val(),
			}
		}
		projectExpArr.push(projectExpJson)
	}
	dataJson.projectExp = projectExpArr;

	//教育背景
	var eduBackgroundArr = [];
	for(var ee= 0 ; ee<$(".edubackgd .addCusInfo").length;ee++){
		var edusoFar = "",isUnified  = "";
		if($(".edusoFar").eq(ee).prop("checked")){
			edusoFar = "T";
		}
		if($(".unified").eq(ee).prop("checked")){
			isUnified = "on";
		}
		var eduBackgroundJson ={
			"eduSchoolName" : $(".eduSchoolName ").eq(ee).val(),
			"eduType" : $(".eduType").eq(ee).val(),
			"eduStartTime" :  $(".eduStartTime ").eq(ee).val(),
			"eduEndTime" :  $(".eduEndTime ").eq(ee).val(),
			"soFar" : edusoFar,
			"eduValue" : {
				"0b8b0f62-7d06-4b2f-8ef7-6ad703d9d67b" : $(".isdegreeSelect").eq(ee).find("option:selected").val(),
				"8ad30b5b-dfaa-43ba-8968-7535eccc28c8" : isUnified,
				"572266df-2bd8-4a46-be10-fd5f595bc4c4" : $(".professionalName").eq(ee).val(),
			},
		}
		eduBackgroundArr.push(eduBackgroundJson)
	}
	dataJson.eduBackground = eduBackgroundArr;
	//语言水平
	var LanguageExpArr = [];
	for(var ff= 0 ; ff<$(".languageLeave .addCusInfo").length;ff++){
		var LanguageExpJson = {
			"languageType" : $(".languageType").eq(ff).val(),
			"languageLevel" : $(".languageLevel").eq(ff).val(),
		}
		LanguageExpArr.push(LanguageExpJson)
	}
	dataJson.languageExp = LanguageExpArr;
	//专业资格
	var majorQualifyArr = [];
	for(var ff= 0 ; ff<$(".profGroupBox .addCusInfo").length;ff++){
		var majorQualifyJson = {
			"papersName" : $(".papersName").eq(ff).val(),
			"getTime" : $(".getTime").eq(ff).val(),
			"issuingAgency": $(".issuingAgency").eq(ff).val(),
		}
		majorQualifyArr.push(majorQualifyJson)
	}
	dataJson.majorQualify = majorQualifyArr;
}
//提交操作
function addPerson(){
	$.ajax({
		url:basePath+"/person/OpAddResumeInfo",
		type:"post",
		async : false,
		data:{"personJson":JSON.stringify(dataJson),"personId":$("#personId").val(),
			  "photoPath" : $("#photoPath").val(),
			  "projectId" : projectId,
			  "analysisPath" : $("#analysisPath").val(),
			  "analysisName" : $("#analysisName").val()
		},
		success:function(data){
			Metronic.unblockUI(".page-content");
        	try{
        		data=JSON.parse(data);
        	}catch(e){
        		Metronic.unblockUI();
        		$.error("数据转换异常！");
        	}
        	if(data.success){//如果人员不重复，新增简历提示简历添加成功
        		Metronic.unblockUI();
        		if(!$('#personId').val()){
        			$.success("简历新增成功", true);
        		}else{
        			$.success("简历修改成功", true);
        		}
        		//上传附件
        		if($(".fileUpload2").val()!=""){
        			var formData = new FormData(document.getElementById("myForm2"));
        			var personalFileType  = $(".fileSelect").find("option:selected").val();
        			$.ajax({
        				url : basePath+"/person/personalFileUpload?personalFileType="+personalFileType+"&perId="+$("#personId").val(),
        				type : "post",
        				async : false,
        				data : formData,
        				processData : false,
        				contentType : false,
        				success : function(datas) {
        					Metronic.unblockUI(".page-content");
        					if(false == datas.success){
        						$.error(datas.content);
        					}else{
        						$.success(datas.content);
        					}
        				},
        				error:function(datas){
        					$.error(datas.content);
        				}
        			})
        		}
        		if("project" == data.title){
        			location.href=basePath+'/project/perTabs/'+ projectId +'.html';
        		}else{
        			//人际关系的保存
        			var array = [];
        			if($(".personalgroup").length>0){
        				for(var nn =0;nn<$(".personalgroup").length;nn++){
            				var obj ={
            					"company" : $(".positionNamevalue").eq(nn).val(),
            					"masterPid" : data.content,
            					"slavePid" : $(".Resumeselection").eq(nn).attr("name"),
            					"relationship" :$(".relation").eq(nn).find("option:selected").val(),
            					"positionName" : $(".positionNameplase").eq(nn).val()+'-'+$("#recentPosition").val()
            				}
            				array[nn]= obj;
            			}
        			}else{
        				var objnull ={
            					"masterPid" : data.content,
            				}
            			array[0] = objnull;
        			}
            		$.ajax({
    					type:"post",
    					async:false,
    					data:{"pss":JSON.stringify(array)},
    					url:basePath+"/personRelationship/save",
    					success:function(data){
    						Metronic.unblockUI(".page-content");
    						/*
    		                if(data.success) {  
    		 					$.success(data.content);
    		           		 }else{
    		           			$.error(data.content);
    		            	} */
    		            }   
    				});
            		location.href=basePath+'/person/list/'+data.content+'-1.html';
        		}
        		
 		}else if(data.title=='REPEACT'){
 			//如果人才重复，新增简历提示简历选取历史版本信息
 			Metronic.unblockUI(".page-content");
 			var content=data.content;
 			$("#content").val(content);
 			bootbox.alert("电话或邮箱信息重复,无法新增人才!")
 		}else if(data.content=='您经纪的人才已达到上限'){
 			Metronic.unblockUI();
				$.error("您经纪的人才已达到上限！");
			}else{
 			//返回错误并且没有带相关重复信息 
 			Metronic.unblockUI();
 			$.error("人才新增失败！");
 			}
 		}
	})
}