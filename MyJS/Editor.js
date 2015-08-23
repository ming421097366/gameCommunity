
//
//function Editor(textID)
//{
//    var me=this;
//    me.textHTML="";
//    me.editor=$("#"+textID).xheditor();
//}
//
//Editor.prototype.onSubmitText=function()
//{
//    var me=this;
//    me.textHTML=me.editor.getSource();
//    alert(me.textHTML);
//    
//   
//};






function onLoad()
{
     $("#submitBtnTextID").click(onSubmitText);
}

function onSubmitText()
{
    var editor=$("#textID").xheditor();//获得editor对象
    
    var textHTML=editor.getSource();//获得eidtor对象中的内容
    var abstract=$("#abstractID").val();
    var title=$("#titleID").val();
    var subtitle=$("#subtitleID").val();
  //  alert(title);
    //alert(subtitle);
//    alert(abstract);
    ajaxAssist(title,subtitle,textHTML,abstract);//获得编辑好的文本，将文本发送到服务器中，在服务器中进行基本的处理然后存入数据库中。
}

function ajaxAssist(title,subtitle,textHTML,abstract)
{
    var postData=
            {
                title:title,
                subtitle:subtitle,
                articleText:textHTML,
                abstract:abstract,
                type:"TEXT_WRITE"
                
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
            
        }
        else
        {
            alert(obj.message+"fail to save the save the atricle");
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
}














$(document).ready(onLoad);