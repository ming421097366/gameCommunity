
var MAIN_SCENE_DIV;//游戏主界面DIV
var SCENE_WIDTH=680;//主界面的宽度
var SCENE_HEIGHT=540;//主界面的高度







/*
    游戏逻辑用到的全局变量，不是参数
*/
var bullets=[];//子弹数组
var planeMe;//飞机对象
var mark=0;//
var enemies=[];//敌机数组
var mark1=0;//
var scores=0;//得分
var animation;

/*

*/




$(document).ready(onLoad);

function moveMyPlane(event,myPlane)
{
    
    //$("#testOut").text("X:"+(event.pageX-8)+",Y:"+(event.pageY-8));
    var newX=event.pageX-8;//飞机中心,鼠标相对于DIV的位置,即鼠标相对于窗口的位置，减去div的位置
    var newY=event.pageY-8;
    if((newX<SCENE_WIDTH-myPlane.sizeWidth/2)&&(newX>myPlane.sizeWidth/2)&&(newY<SCENE_HEIGHT-myPlane.sizeHeight/2)&&(newY>myPlane.sizeHeight/2))
    {
        
        myPlane.imageNode.css({"top":(newY-myPlane.sizeHeight/2)+"px","left":(newX-myPlane.sizeWidth/2)+"px"});
        myPlane.posX=newX;
        myPlane.posY=newY;
    }

}
/*
 * posX 飞机中心位置X
 * posY 飞机中心位置Y
 * sizeWidth    飞机宽度
 * sizeHeight   飞机高度
 * liveImage    飞机活的图像
 * boomImage    飞机爆炸的图像
 * hp   飞机的血量
 * score    飞机的分数
*/



function gameLoop()
{
    

    mark++;
    
    if(mark==20)//每20次循环,创造一只飞机
    {
        mark1++;
        if(mark1==20)//每20*20次循环，创造一只大飞机
        {
            enemies.push(new Plane(randomX(ENEMY_PLANE_3_WIDTH/2,(SCENE_WIDTH-ENEMY_PLANE_3_WIDTH/2)),-100,ENEMY_PLANE_3_WIDTH,ENEMY_PLANE_3_HEIGHT,ENEMY_PLANE_3_LIVE_SRC,ENEMY_PLANE_3_BOOM_SRC,ENEMY_PLANE_3_HP,ENEMY_PLANE_3_SCORE,ENEMY_PLANE_3_DIE_TIMES,randomX(1,2)));
            mark1=0;
        }
        else if(mark1%5==0)//没20*5次创造一只飞机
        {
            enemies.push(new Plane(randomX(ENEMY_PLANE_2_WIDTH/2,(SCENE_WIDTH-ENEMY_PLANE_2_WIDTH/2)),-100,ENEMY_PLANE_2_WIDTH,ENEMY_PLANE_2_HEIGHT,ENEMY_PLANE_2_LIVE_SRC,ENEMY_PLANE_2_BOOM_SRC,ENEMY_PLANE_2_HP,ENEMY_PLANE_2_SCORE,ENEMY_PLANE_2_DIE_TIMES,randomX(1,3)));
        }
        else//每20次创造一只小飞机
        {
            enemies.push(new Plane(randomX(ENEMY_PLANE_1_WIDTH/2,(SCENE_WIDTH-ENEMY_PLANE_1_WIDTH/2)),-100,ENEMY_PLANE_1_WIDTH,ENEMY_PLANE_1_HEIGHT,ENEMY_PLANE_1_LIVE_SRC,ENEMY_PLANE_1_BOOM_SRC,ENEMY_PLANE_1_HP,ENEMY_PLANE_1_SCORE,ENEMY_PLANE_1_DIE_TIMES,randomX(1,3)));
        }
        
         mark=0;
    }
    
    
    
    
    
    
    
    
    if(mark%5==0)//每5次调用加入一个子弹
    {
        bullets.push(createBullet(planeMe.posX,planeMe.posY-planeMe.sizeWidth/2));
    }
    
      
    for(var i=0;i<bullets.length;i++)
    {
        bullets[i].move();//移动子弹
        if (bullets[i].posY < 0) //删除超界的子弹
        {
            bullets[i].imageNode.remove();
            bullets.splice(i, 1);
        }
        
    }
    for(var i=0;i<enemies.length;i++)
    {
        enemies[i].move(scores);
        if (enemies[i].posY >SCENE_HEIGHT+100) //删除超界的飞机
        {
            enemies[i].imageNode.remove();
            enemies.splice(i, 1);
        }
        if(enemies[i].isDead)
        {
            enemies[i].dieTime+=20;
            if(enemies[i].dieTime==enemies[i].dieTimes)
            {
                //删除死亡的敌机
                enemies[i].imageNode.remove();
                enemies.splice(i,1);
            }
        }
    }
    
    //碰撞检测
    for(var i=0;i<bullets.length;i++)
    {
        for(var j=0;j<enemies.length;j++)
        {
            /*
             * 类似于判断，MBR是否相交的碰撞检测
             */
           if(!enemies[j].isDead) 
          {
               
           
            //敌机和子弹的碰撞检测
           var tmp1=Math.abs(bullets[i].posX-enemies[j].posX);//子弹中心的X距离
           var tmp2=Math.abs(bullets[i].posY-enemies[j].posY);//飞机中心的Y距离
           var tmp3=bullets[i].sizeWidth/2+enemies[j].sizeWidth/2;//较大的宽度
           var tmp4=bullets[i].sizeHeight/2+enemies[j].sizeHeight/2;//较大的高度
           if(tmp1<=tmp3&&tmp2<=tmp4)//宽度小于距离且高度小于距离，则判定为碰断
           {
               enemies[j].hp-=bullets[i].attack;
               if(enemies[j].hp==0)
               {
                   scores+=enemies[j].score;//修改内部逻辑的分数
                   $("#scoreSpanID").text(scores);//刷新显示的分数
                   enemies[j].imageNode.attr("src",enemies[j].boomImage);  //修改敌机的图像为死亡状态
                   enemies[j].isDead=true;//在逻辑中标记敌机死亡
               }
               
               bullets[i].imageNode.remove();
               bullets.splice(i,1);
               
              
           }
           
           //敌机和本机的碰撞检测
           var tmp5=Math.abs(planeMe.posX-enemies[j].posX);//子弹中心的X距离
           var tmp6=Math.abs(planeMe.posY-enemies[j].posY);//飞机中心的Y距离
           var tmp7=planeMe.sizeWidth/2+enemies[j].sizeWidth/2;//
           var tmp8=planeMe.sizeHeight/2+enemies[j].sizeHeight/2;//较大的高度
           if(tmp5<=tmp7&&tmp6<=tmp8)
           {
               
               planeMe.imageNode.attr("src",planeMe.boomImage);//修改本机为死亡状态
               clearInterval(animation);
               MAIN_SCENE_DIV.unbind("mousemove");
               
               $("#scores").text("得分："+scores);
               $("#endSceneDivID").show();
               
               
               
           }
           
           
           
         }
            
        }
    }
    
        
    

}


function onLoad()
{
  MAIN_SCENE_DIV=$("#mainSceneDivID");//获得主界面DIV
//  planeMe=new Plane(SCENE_WIDTH/2,SCENE_HEIGHT-MY_PLANE_HEIGHT/2,MY_PLANE_WIDTH,MY_PLANE_HEIGHT,MY_PLANE_LIVE_SRC,MY_PLANE_BOOM_SRC);//用飞机的中心地位
//    //添加一个鼠标移动的响应函数，让myPlane的中心跟随鼠标。
//  MAIN_SCENE_DIV.mousemove(function(event){moveMyPlane(event,planeMe);});
  
  //animation=setInterval(gameLoop,50);//开始动画循环
    $("#beginAgain").click(beginAgain);
    $("#beginGameButtonID").click(beginGame);
    
}

function beginGame()
{
    //初始化
   if(planeMe!=null)
    {
        planeMe.imageNode.remove();
    }
   
   for(var i=0;i<enemies.length;i++)
   {
       enemies[i].imageNode.remove();
   }
   for(var i=0;i<bullets.length;i++)
   {
      bullets[i].imageNode.remove();
   }
   planMe=null;
   enemies=[];
   bullets=[];
   //
    
  planeMe=new Plane(SCENE_WIDTH/2,SCENE_HEIGHT-MY_PLANE_HEIGHT/2,MY_PLANE_WIDTH,MY_PLANE_HEIGHT,MY_PLANE_LIVE_SRC,MY_PLANE_BOOM_SRC);//用飞机的中心地位
    //添加一个鼠标移动的响应函数，让myPlane的中心跟随鼠标。
  MAIN_SCENE_DIV.mousemove(function(event){moveMyPlane(event,planeMe);});
  animation=setInterval(gameLoop,50);//开始动画循环
  $("#beginSceneDivID").hide();//隐藏开始界面的div
}
function beginAgain()
{

   
    
    
    $("#endSceneDivID").hide();
    beginGame();
}










