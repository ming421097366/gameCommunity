

function FriendDialog()
{
    var me=this;
    me.dialogID=uuid();
    me.friendPanelID=uuid();
    me.friendID;
    me.html='<div id="'+me.dialogID+'">'+
              '  <div>'+
               '     <ul id="'+me.friendPanelID+'"></ul>'+
                '</div>'+
            '</div>';
    $(me.html).appendTo($("body"));
    $("#"+me.dialogID).dialog().hide();
    me.__init();
    
}

FriendDialog.prototype.show=function()
{
    var me=this;
    $("#"+me.dialogID).dialog().show();
    
};

FriendDialog.prototype.destroy=function()
{
  var me=this;
  $("#"+me.dialogID).remove();
    
};

FriendDialog.prototype.dealChatDialog=function(friendID)
{
      var me=this;
      me.friendID=friendID;
      
      animation=setInterval(animate,1000);
};


FriendDialog.prototype.__init=function()
{
    
    
  var me=this;

    var postData=
            {  
                "type":"FRIEND_GET"      
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
//              alert("aa");
              var friendPanel=$("#"+me.friendPanelID);
              for(var i=0;i<obj.data.length;i++)
              {
                  $("<li>").appendTo(friendPanel).append(
                          $("<button>"+obj.data[i].friendid+"</button>").attr("friendid",obj.data[i].friendid).click(
                          function(){
                             // alert($(this).attr("friendid"));
                             me.dealChatDialog($(this).attr("friendid"));
                          })
                                  );
              }
              
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

  
};