app.controller("userInfoServiceController",function($scope,userInfoService){
    var entity = $scope.entity={};
    var show_num = [];
    $("#canvas").on('click',function(){
        draw(show_num);
    })
    function draw(show_num) {
        var canvas_width=$('#canvas').width();
        var canvas_height=$('#canvas').height();
        var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
        var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
        var aCode = sCode.split(",");
        var aLength = aCode.length;//获取到数组的长度
          for (var i = 0; i <= 3; i++) {
            var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
            var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
            var txt = aCode[j];//得到随机的一个内容
            show_num[i] = txt.toLowerCase();
            var x = 10 + i * 20;//文字在canvas上的x坐标
            var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
            context.font = "bold 23px 微软雅黑";
            
            context.translate(x, y);
            context.rotate(deg);
    
            context.fillStyle = randomColor();
            context.fillText(txt, 0, 0);
    
            context.rotate(-deg);
            context.translate(-x, -y);
          }
          for (var i = 0; i <= 5; i++) { //验证码上显示线条
              context.strokeStyle = randomColor();
              context.beginPath();
              context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
              context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
              context.stroke();
          }
          for (var i = 0; i <= 30; i++) { //验证码上显示小点
              context.strokeStyle = randomColor();
              context.beginPath();
              var x = Math.random() * canvas_width;
              var y = Math.random() * canvas_height;
              context.moveTo(x, y);
              context.lineTo(x + 1, y + 1);
              context.stroke();
          }
      }
    function randomColor() {//得到随机的颜色值
          var r = Math.floor(Math.random() * 256);
          var g = Math.floor(Math.random() * 256);
          var b = Math.floor(Math.random() * 256);
          return "rgb(" + r + "," + g + "," + b + ")";
    }
    draw(show_num);

    $scope.codeBtn = function(){

    }



    var validCode=true;
    $scope.codeSave=function($event){
        entity.errorMsg = {};
        var num = show_num.join("");
        if(entity.mobile == undefined){
            entity.errorMsg.mobile = '请输入手机号码';
            return; 
        }else if(!entity.mobile.match(/^[1][0-9][0-9]{9}$/)){
            entity.errorMsg.mobile = '请输入正确的手机号码';
            return; 
        }else if(entity.vCodeBox == undefined){
            entity.errorMsg.vCodeBox = '请输入图形验证码';
        }else if(entity.vCodeBox != num){
            entity.errorMsg.vCodeBox = '请输入正确的验证码';
            $(".vCode").val('');
            draw(show_num);
        }else{
            var timeDown=60;
            if (validCode) {
                validCode=false;
                userInfoService.code(entity.mobile).success(function(response){
                    console.log(response)
                })
                var t=setInterval(function() {
                    timeDown--;
                    $($event.target).text(timeDown+"重新发送");
                    if (timeDown==0) {
                        clearInterval(t);
                        $($event.target).text("获取验证码");
                        validCode=true;
                    }
                },100)
            }
            
            
        }
    }

    // 新增或者更新
    $scope.save=function(){
        var num = show_num.join("");
        entity.errorMsg = {};
        if(entity.mobile == undefined){
            entity.errorMsg.mobile = '请输入手机号码';
            return; 
        }else if(!entity.mobile.match(/^[1][0-9][0-9]{9}$/)){
            entity.errorMsg.mobile = '请输入正确的手机号码';
            return; 
        }else if(entity.vCodeBox == undefined){
            entity.errorMsg.vCodeBox = '请输入图形验证码';
            return; 
        }else if(entity.vCodeBox != num){
            entity.errorMsg.vCodeBox = '请输入正确的验证码';
            $(".vCode").val('');
            draw(show_num);
            return; 
        }else if(entity.password == undefined){
            entity.errorMsg.password = '请输入密码';
            return; 
        }else if(entity.password1 == undefined){
            entity.errorMsg.password1 = '请输入确认密码';
            return; 
        }else if(entity.password1 != entity.password){
            entity.errorMsg.password1 = '确认密码输入错误';
            return; 
        }else if(entity.agreement != "true"){
            entity.errorMsg.agreement = '请同意以下条款';
            return; 
        }else{
            var data = {
                mobile : entity.mobile,
                password : entity.password,
                identyCode : entity.phoneCode
            }
            var object;
            object=userInfoService.save(data);
            object.success(
                function(response){
                    if(response.success){
                        console.log(response);
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