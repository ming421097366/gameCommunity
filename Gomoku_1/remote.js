
var animation=null;

var dlg=null;
var chess={row:-1,col:-1,coloe:-1};

function remoteHuman()
{
    init();
    userToRemote=true;
    yourTurn=true;
    isBlack=true;
    dlg=new FriendDialog();
    dlg.show();
   
    
  
    
    
}

function animate()
{
    var row=0;
    var col=0;
    var color=0;
     getChess();
     
     if(chess.row!=-1&&chess.col!=-1&&chess.color!=-1)
    {
        row=chess.row;
        col=chess.col;
        color=chess.color;//--------------------为什用全局变量，因为ajax的变量return 不出来？
    }
    //得到行列号，draw下来   
    //得到行列号和颜色
    if(row!=0&&col!=0&&color!=0)//---------------避免画错
    {      
        if (chessArray[row][col] == 0)
        {
           if(color==1)//----------------------------??????????????奇怪，直接传color不行
           {
               playChess(1,row,col);
               isBlack=false;
           }
           else
           {
               playChess(2,row,col);
               isBlack=true;
           }            
            chess.row=-1;
            chess.col=-1;
            chess.color=-1;
            yourTurn=true;
        }      
    }
    
}

function getChess()
{
    var postData=
            {  "enemyID":dlg.friendID,
                "type":"CHESS_GET"      
            };
    postData=JSON.stringify(postData);
            
    function errorHandle(xhr,message)
    {
        alert(message);
    }
    
     function successHandle(data)
     {
          var obj=JSON.parse(data);
          if(obj.success)
          {
              chess.row=obj.list[0].row;
              chess.col=obj.list[0].col;
              chess.color=obj.list[0].color;
          }
          else
          {
              alert(obj.message);
          }
          
      } 
    var ajaxParameter=
            {
              url:URL.server1,
              type:"POST",
              data:{parameters:postData},
              error:errorHandle,
              success:successHandle
                
            };  
     $.ajax(ajaxParameter);
}

function writeChess(wrow,wcol,wcolor)
{
    var postData=
            {  "rownum":wrow,
                "colnum":wcol,
                "color":wcolor,
                "type":"CHESS_WRITE"      
            };
    postData=JSON.stringify(postData);
            
    function errorHandle(xhr,message)
    {
        alert(message);
    }
    
     function successHandle(data)
     {
          var obj=JSON.parse(data);
          if(obj.success)
          {
         //     alert(obj.message);
          }
          else
          {
              alert(obj.message);
          }
          
      }
    

    
    var ajaxParameter=
            {
              url:URL.server1,
              type:"POST",
              data:{parameters:postData},
              error:errorHandle,
              success:successHandle
                
            };
    
    
     $.ajax(ajaxParameter);
    
}



function deleteDataFromDB()
{
  //  alert("delete");
    var postData=
            {  
                "type":"CHESS_DELETE"      
            };
    postData=JSON.stringify(postData);
            
    function errorHandle(xhr,message)
    {
        alert(message);
    }
    
     function successHandle(data)
     {
          var obj=JSON.parse(data);
          if(obj.success)
          {
             // alert(obj.message);
          }
          else
          {
              alert(obj.message);
          }
          
      }
    

    
    var ajaxParameter=
            {
              url:URL.server1,
              type:"POST",
              data:{parameters:postData},
              error:errorHandle,
              success:successHandle
                
            };
    
    
     $.ajax(ajaxParameter);
    
}