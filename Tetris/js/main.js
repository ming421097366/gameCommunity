




/*
 * 全局参数-------------------------
 */

/*
 * 全局参数------------------------
 */




/*
 * 全局逻辑变量-------------------------
 */
var mainPanel=null;
var animation=null;
var map;
var box;

/*
 * 全局逻辑变量------------------------
 */

function start()
{
    map.init();
    if(animation==null)
    {
        animation=setInterval(animate,100);
    }
    
}


function pause()
{
    if(animation!=null)
    {
        clearInterval(animation);
        animation=null;
    }
    
}

//恢复暂停函数
function cancelPause()
{
    if(animation==null)
    {
        animation=setInterval(animate,100);
    }
}

$(document).ready(onLoad);


function onLoad()
{
    map=new Map(30,12);
    box=new Box(4,0);
    mainPanel=document.getElementById("canvasID").getContext("2d");
    $(document).keydown(onKeydown);
    $("#start").click(start);
    $("#pause").click(pause);
    $("#cancelPause").click(cancelPause);
    map.draw();
  //  animation=setInterval(animate,100);
}

function onKeydown(event)
{

    switch (event.which)
    {
        case 37:
            if(testNewPosition(box.posX-1,box.posY,box.matrix))
            {
                box.move("left");
                drawAll();
            }
            
            break;
        case 38:
            box.rotate();
            drawAll();
            break;//up
        case 39:
            if(testNewPosition(box.posX+1,box.posY,box.matrix))
            {
                box.move("right");
                drawAll();
            }
            break;
        case 40:
            break;//down
        
            
    }
    
}

function clear()
{
   mainPanel.clearRect(0,0,240,600);
}

function drawAll()
{
    clear();
    map.draw();
    box.draw();
}

function animate()
{
    
    drawAll();
    if(box.drop())
    {

    }
    else
    {
      map.putBoxToMap();
      map.cleanFull();
      box=new Box(4,0);
      if(!box.drop())
      {
        alert("you are failed!");
        clearInterval(animation);
        animation=null;
        
      }
      
    }

    
    
}