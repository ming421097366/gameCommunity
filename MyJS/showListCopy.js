

$(document).ready(onLoad);


function onLoad()
{
     showList();//载入文章目录
     
}

function showList()
{
    getList(10);//限定获得的目录的数目
}

function onClickLi(id)
{
   var id=$(this).attr("id");//传递id的好方法
   getHtmlText(id);//载入文章
   setReviewPanel(id);//载入评论面板
   setUpPanel(id);//载入点赞面板
   getReviews(id,10);//载入评论
    

    
  
}

function setUpPanel(id)
{
    var div=$("#upWriteDivID");
    div.html("");
    var html=   '<div id="upSetDivID">赞</div>';
               
    div.append(html);
    
    $("#upSetDivID").click(function(){setUp(id);});
}

function setUp(id)
{
    
    //将赞记录到数据库中
    var postData=
            {
                text_id:id,
                type:"UP_WRITE"
                
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
            alert(obj.message+"fail to up the article ");
            
          
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

function setReviewPanel(id)//载入评论面板
{
    var div=$("#reviewWriteDivID");
    div.html("");
    var reviewWriteID="reviewWriteArea"+id;
    var html=  '<span>发表评论</span>'+
            '<br/>'+
            '<textarea id="'+reviewWriteID+'">'+
            '</textarea>'+
            '<br/>'+
            '<button id="btnSubmitReviewID">提交</button>';
    div.append(html);
    $("#btnSubmitReviewID").click(function(){writeReviewAssist(id);});
}

function writeReviewAssist(id)
{
    
    var textArea=$("#reviewWriteArea"+id);
    var review=textArea.val();//表单元素获得值的操作都是用val
    writeReview(id,review);
    
}

function writeReview(id,review)//将评论载入服务器
{
    var postData=
            {
                text_id:id,
                review:review,
                type:"REVIEW_WRITE"
                
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
            getReviews(id,10);//刷新reviews
            
        }
        else
        {   
            alert(obj.message+"fail to write the review ");
            
          
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


function getHtmlText(id)//从服务器取得文章
{
    
      var postData=
            {
                articleID:id,
                type:"TEXT_READ"
                
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
            var title=obj.data["title"];//获得文章标题
            var htmlText=obj.data["textHtml"];//获得文章内容
            var reviewsNum=obj.data["reviews"];//获得文章评论数目
            var ups=obj.data["ups"];//获得文章赞的数目
            $("#titleDivID").html(title);//载入文章标题
            $("#textDivID").html(htmlText);//载入文章内容
            $("#reviewsNumDivID").html("评论数目："+reviewsNum);//载入文章评论
            $("#upNumDivID").html("赞("+ups+")");
            
            
            SyntaxHighlighter.highlight();//这句话放在click的响应函数里面不行？？？，高亮代码
            
            
        }
        else
        {
            alert(obj.message+"fail to get the atricle");
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
    return true;
}


function getList(num)//获得目录
{
    
    var postData=
            {
                articleCount:num,
                type:"LIST_GET"
                
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
          var div=$("#titleListDivID")
          var list=obj.list;
          for(var i=0;i<list.length;i++)
          {
              var liID=list[i]["id"];
              $("<li id='"+liID+"'>"+list[i]["title"]+"</li>").appendTo(div);//载入目录                                 
              $("#"+liID).click(onClickLi);//搞不懂啊，js的问题好多，为目录添加一个点击事件响应函数，这个函数包含了剩下的逻辑
          }
      }
        else
        {
            alert(obj.message+"fail to get the atricle list");
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

function getReviews(id,num)//获得相应文章，给定数目的评论
{
      var postData=
            {
                reviewCount:num,
                articleID:id,
                type:"REVIEW_READ"
                
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
          var div=$("#reviewDivID");
          div.html("");
          var list=obj.list;
          for(var i=0;i<list.length;i++)
          {
              var reviewID="review"+list[i]["id"];
              $("<div id='"+reviewID+"'>"+"第"+(i+1)+"楼"+"<br/>"+list[i]["review"]+"<br/>"+list[i]["review_time"]+"</div>").appendTo(div);
              
          
          }
      }
        else
        {
            alert(obj.message+"fail to get the review list");
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

