


<?php

//判断session是否存在，如果不存在，不允许访问该页面。
//弹出登录页面
session_start();

    $htmlText=<<<STR
    <html>
    <head>
        <title>文本编辑器</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">
        <script type="text/javascript" src="jQuery/jquery-1.4.4.min.js"></script>
        <script type="text/javascript" src="xhEditor/xheditor-1.2.1.min.js"></script>
        <script type="text/javascript" src="xhEditor/xheditor_lang/zh-cn.js"></script>
        <script type="text/javascript" src="MyJS/Editor.js"></script>
        <script type="text/javascript"src="MyJS/ServerURL.js"></script>
    </head>
    <body background="images/bg.jpg">
        <div>
        <span>标题</span>
        <input type="text" id="titleID" onblur="if(this.value == '')this.value='请输入标题';" 
               onclick="if(this.value == '请输入标题')this.value='';" value="请输入标题" style="width:300px">
        </div>
        <div>
        <span>小标题</span>
        <input type="text" id="subtitleID" onblur="if(this.value == '')this.value='请输入小标题';" 
               onclick="if(this.value == '请输入小标题')this.value='';" value="请输入小标题" style="width:300px">
        </div>
        <div>
        <button id='submitBtnTextID'>提交</button><br/>
        <textarea id="textID" name="content" class="xheditor {skin:'o2007blue',tools:'full',layerShadow:50,width:800,height:600}"></textarea>
        </div>
        <div style="left:820px; top:50px; position:absolute">
            <span>摘要</span>
            <textarea id="abstractID"></textarea>
         </div>

      
    </body>
</html>

            

STR;
    
$loginHtml=<<<STR
                
        <script type="text/javascript">
             window.location.href="login.html"; 
        </script>
        
STR;
    
    if($_SESSION["userid"])
    {
        echo $htmlText;
    }
    else
    {
        echo $loginHtml;
        
    }



?>


