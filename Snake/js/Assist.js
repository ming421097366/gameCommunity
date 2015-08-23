

//暂停函数
function pause()
{
    if(animationF!=null)
    {
        clearInterval(animationF);
        animationF=null;
    }
    
}

//恢复暂停函数
function cancelPause()
{
    if(animationF==null)
    {
        animationF=setInterval(animation,50);
    }
}







//食物的位置是否和蛇身重合
function isContain()
{
    for(var i=0;i<snake.length;i++)
    {
        if(snake[i].posX==food.posX&&snake[i].posY==food.posY)
        {
            return true;
        }
    }
    return false;
}


//移动蛇
function moveSnake()
{
    switch (direction)
    {
        //蛇移动，是在蛇节点数组尾部添加一个节点
        case "RIGHT":
            snake.push(new SnakeNode(snake[snake.length-1].posX+1,snake[snake.length-1].posY));
            break;
        case "LEFT":
            snake.push(new SnakeNode(snake[snake.length-1].posX-1,snake[snake.length-1].posY));
            break;
        case "UP":
            snake.push(new SnakeNode(snake[snake.length-1].posX,snake[snake.length-1].posY-1));
            break;
        case "DOWN":
            snake.push(new SnakeNode(snake[snake.length-1].posX,snake[snake.length-1].posY+1));
            break;
                
            
    }
    if(food.posX==snake[snake.length-1].posX&&food.posY==snake[snake.length-1].posY)
    {
        //如果吃到食物，蛇节点数增长,不用删除数组头部节点
        food.posX=-1;
        food.posY=-1;
    }
    else
    {
        //否则删除数组头节点
        snake.shift();
        
    }
    
    
}


//按键响应函数
function onKeydown(event)
{
//    alert(event.which);
    switch (event.which)
    {
        case 37:
            if(direction!="RIGHT")//如果当前方向是有不允许往左，以下类似
            {direction = "LEFT";}
            break;
        case 38:
            if(direction!="DOWN")
            {direction = "UP";}
            break;
        case 39:
            if(direction!="LEFT")
            {direction = "RIGHT";}
            break;
        case 40:
            if(direction!="UP")
            {direction = "DOWN";}
            break;
            
    }
    
}


//绘制蛇和食物
function drawSnake()
{
    mainPanel.clearRect(0,0,480,480);//清空场景
    food.draw();//画食物
    for(var i=0;i<snake.length;i++)
    {
        snake[i].draw();//画蛇    
    }
    
}


//生存新的食物
function newFood()
{
        while(true)
        {
            var posX=Math.floor(Math.random()*24);
            var posY=Math.floor(Math.random()*24);
            food.posX=posX;
            food.posY=posY;//获得随机位置
            if(!isContain())
            {
                break;//如果是可用位置，则结束
            }
        }
    
}


//是否死亡
function checkDie()
{
    if(snake[snake.length-1].posX<0||snake[snake.length-1].posY<0||snake[snake.length-1].posY>rows-1||snake[snake.length-1].posX>cols-1)
    {
        return true;//撞墙死
    }
    else
    {
        for(var i=0;i<snake.length-1;i++)
        {
            if(snake[i].posX==snake[snake.length-1].posX&&snake[i].posY==snake[snake.length-1].posY)
            {
                return true;//撞自己死
            }
        }
    }
    
    return false;
}
