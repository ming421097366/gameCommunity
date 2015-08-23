

function RegistDialog(options)//RegistDialog类的构造函数
{
    var me=this;//用me的原因是保护作用域
    
    me.options=$.extend({
        loginSuccess:false
    },options);
    
    me.userNameID=uuid();
    me.passwordID=uuid();
    me.loginID=uuid();
    me.dialogID=uuid();
    me.registID=uuid();
    

    me.html="<div id='"+me.dialogID+"' title='Regist'>"+
            "<table>"+
             "   <tr>"+
              "      <td>userName</td>"+
               "     <td><input type='text' id='"+me.userNameID+"'value=''/></td>"+
                "</tr>"+
                "<tr>"+
                 "   <td>password</td>"+
                  "  <td><input type='password' id='"+me.passwordID+"' value=''/></td>"+
                "</tr>"+
                "<tr>"+
                 "   <td><button type='button' id='"+me.registID+"'>regist</button></td>"+
                  "  <td><button type='button' id='"+me.loginID+"'>login</button></td>"+
                "</tr>"+
            "</table>"+
        "</div>";//这句html要处理得很细心才可以，名值对中，值是在引号中的！
    

        
    $(me.html).appendTo($("body"));//这样子超级依赖它的执行顺序。
    $("#"+me.loginID).click(
        function()
        {me.onLogin();}
    );//这里非要写成函数调用？？
       $("#"+me.registID).click(
        function()
        {me.onRegist();}
    );//这里非要写成函数调用？？

}

RegistDialog.prototype.onShow=function()
{
    var me=this;
  
  $("#"+me.dialogID).dialog();
};

RegistDialog.prototype.onLogin=function()
{
     var me=this;
     me.options.loginSuccess();
      
};

  RegistDialog.prototype.destroy=function()//删除窗口，实质是删除一个div
  {
      var me=this;
      $("#"+me.dialogID).remove();
  };
  
  RegistDialog.prototype.onRegist=function()
  {

    var me=this;
    var user = {
        userName: $("#" + me.userNameID).val(),
        password: $("#" + me.passwordID).val()
    };
    
    //将登录信息传到数据库中
    var postData=
            {
                "user":user,
                "type":"USER_REGIST"
                
            };
    postData=JSON.stringify(postData);
            
    function errorHandle(xhr,message)
    {
        alert(message);
    }
    
    
    function successHandle(echoData)
    {
        var obj=JSON.parse(echoData);
        if(obj.success)
        {
            
            alert(obj.message);
            window.location.href="login.html"; 
            
        }
        else
        {   
            alert(obj.message+"fail to regist ");
            
        
        }
            
        
        
    }
    
    var ajaxParameter=
            {
              url:URL.server,
              type:"POST",
              data:{parameters:postData},
              error:errorHandle,
              success:successHandle
                
            };
    
    
     $.ajax(ajaxParameter);
      
      
  };
    


