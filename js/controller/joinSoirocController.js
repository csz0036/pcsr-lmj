app.controller("joinSoirocController",function($scope,joinSoirocService){
    // $scope.flag=true;
    $scope.initData = {
        oinSoiroc:[],
        jobTitle: ''
    }
    var entity = $scope.entity={};
    $scope.oinSoiroc = function (rows,page) {
        let newRows = rows || 999
        let newPage = page || 1
		joinSoirocService.search(newRows,newPage,{}).success(function (response) {
			if (response.success) { 
                console.log(response.obj.rows)
                $scope.initData.oinSoiroc.push(response.obj.rows)
            layui.use(['table','form'], function(){
                var table = layui.table,
                    form = layui.form;
                var table1 = table.render({
                    elem: '#table1',
                    id : "table_e1",
                    // url: `/api/joinsoiroc/search?rows=100&page=1`,
                    // method: "post",
                    // contentType : 'application/json',
                    parseData : function(res){
                        return {
                            "code": res.code, //解析接口状态
                            "msg": res.message, //解析提示文本
                            "data": res.obj.rows, //解析数据列表
                            "count": res.obj.total,
                        };
                    },
                    where: {},
                    data: $scope.initData.oinSoiroc[0],
                    // request: {
                    //     pageName: "page" //页码的参数名称，默认：page
                    //     ,limitName: "rows" //每页数据量的参数名，默认：limit
                    // },
                    page: {
                        layout: [ 'prev', 'page', 'next', 'skip'], //自定义分页布局
                        prev : "上一页",
                        next : "下一页",
                    }, //开启分页
                    cols: [
                        [ //表头
                            {field: 'jobTitle', title: '职位名称', width:153,align:'center' }
                            ,{field: 'jobType', title: '职位类型', width:150,align:'center'}
                            ,{field: 'workingPlace', title: '工作地点',align:'center'}
                            ,{field: 'updateTime', title: '发布时间', width:178,align:'center'}
                            ,{field: 'status', title: '&nbsp;', width:60,align:'center',templet:function(d){
                                return  d.status?'<div style="color:red">已投递</div>':'<div>未投递</div>'
                            }} 
                            ,{field: '', title: '&nbsp;', width:60,align:'center',templet:function(){
                                return '<div><i class="iconfont">&#xe6c8;</i></div>'
                            }}
                            ,{field: '', title: '&nbsp;', width: 0,align:'center',hide:true,templet: function(d){
                                return '<div class="duty">'+d.duty+'</div>'
                            }}
                            ,{field: '', title: '&nbsp;', width: 0,align:'center',hide:true,templet: function(d){
                                return '<div class="qualification">'+d.qualification+'</div>'
                            }}
                        ]
                    ],
                    done:function(){
                        
                    }
                });
                table.on('row(table1)', function(obj){
                    var duty = obj.data.duty;
                    var qualification = obj.data.qualification;
                    $scope.initData.jobTitle = obj.data.jobTitle
                    var _html = "<div class='addContent'> " + 
                                    " <h1>岗位职责</h1>" + 
                                    "<p>"+obj.data.duty+"</p>" +
                                    "<h1>任职资格</h1>" + 
                                    "<p>"+obj.data.qualification+"</p>" +
                                    "<p><strong>求职邮件：gmo@soiroc.com</strong></p>"+
                                    "<a href='javascript:;'>应聘职位</a>" +
                                "</div>";
                    $(".addContent").remove();
                    if(obj.tr.hasClass("addHtml")){
                        $(".addContent").remove();
                        obj.tr.removeClass("addHtml");
                    }else{
                        obj.tr.addClass("addHtml");
                        obj.tr.after(_html);
                    }
                    
                
                });
                $(".table").on("click",".addContent a",function(){
                    if(window.localStorage.getItem('joinPersonInfo')){
                        var param = JSON.parse(window.localStorage.getItem('joinPersonInfo'))
                        var object;
                        object=joinSoirocService.add(param);
                        object.success(
                            function(response){
                                if(response.success){
                                    window.localStorage.setItem("flags",1)
                                    console.log(response);

                                    window.localStorage.setItem('joinPersonInfo',JSON.stringify($scope.entity))
                                    
                                    layer.msg('投递成功')

                                    $(".addFrom").hide();
                                    $(".table").show();
                                
                                }else{
                                    console.log(response.message);
                                }
                            }
                        )
                    } else {
                        $(this).addClass("on");
                        $(".table").hide();
                        $(".addFrom").show();
                    }
                });
                
            
            });

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

                        window.localStorage.setItem('joinPersonInfo',JSON.stringify($scope.entity))
                        layer.msg('投递成功')
                        
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