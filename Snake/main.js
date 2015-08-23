


/*
 ------------全局逻辑变量----------
 */
var animationF=null;
var mainPanel;//context
var snake=[new SnakeNode(10,10),new SnakeNode(10,11),new SnakeNode(10,12),new SnakeNode(10,13)];
var food=new SnakeNode(15,15);
var direction="RIGHT";
var rows=24;
var cols=24;
var mark=0;

/*
 * ------------全局逻辑变量----------
 */





$(document).ready(onLoad);

function onLoad()
{
    $("#restart").click(function(){location.reload();});
    $("#pause").click(pause);
    $("#cancel").click(cancelPause);
    mainPanel=document.getElementById("mainPanel").getContext("2d");
    $(document).keydown(onKeydown);
    
    animationF=setInterval(animation,50);

}

function animation()//主循环
{
    if(checkDie())
    {
        clearInterval(animationF);
        animationF=null;
        alert("you are failed");
    }
    else
    {
        mark++;
        if(mark%5==0)
        {
            drawSnake();//画蛇和食物
            moveSnake();//移动蛇
        }
        if(food.posX==-1&&food.posY==-1)//生成食物
        {
            newFood();
            //确定食物的新位置
        }
    }
    
    

}
