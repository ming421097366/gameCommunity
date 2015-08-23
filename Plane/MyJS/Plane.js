
/*
 * 飞机参数
 */

var MY_PLANE_WIDTH=66;//我机的宽度
var MY_PLANE_HEIGHT=80;//我机的高度
var MY_PLANE_BOOM_SRC="Image/myPlaneB.gif";//我机的图片
var MY_PLANE_LIVE_SRC="Image/myPlane.gif";//

var ENEMY_PLANE_1_WIDTH=34;
var ENEMY_PLANE_1_HEIGHT=24;
var ENEMY_PLANE_1_LIVE_SRC="Image/enemy1.png";
var ENEMY_PLANE_1_BOOM_SRC="Image/enemy1b.gif";
var ENEMY_PLANE_1_SCORE=1000;
var ENEMY_PLANE_1_HP=1;
var ENEMY_PLANE_1_DIE_TIMES=360;


var ENEMY_PLANE_2_WIDTH=46;
var ENEMY_PLANE_2_HEIGHT=60;
var ENEMY_PLANE_2_LIVE_SRC="Image/enemy2.png";
var ENEMY_PLANE_2_BOOM_SRC="Image/enemy2b.gif";
var ENEMY_PLANE_2_SCORE=5000;
var ENEMY_PLANE_2_HP=6;
var ENEMY_PLANE_2_DIE_TIMES=360;

var ENEMY_PLANE_3_WIDTH=110;
var ENEMY_PLANE_3_HEIGHT=164;
var ENEMY_PLANE_3_LIVE_SRC="Image/enemy3.png";
var ENEMY_PLANE_3_BOOM_SRC="Image/enemy3b.gif";
var ENEMY_PLANE_3_SCORE=30000;
var ENEMY_PLANE_3_HP=12;
var ENEMY_PLANE_3_DIE_TIMES=540;

/*
 * 飞机参数
 *

/*
 * posX 飞机中心位置X
 * posY 飞机中心位置Y
 * sizeWidth    飞机宽度
 * sizeHeight   飞机高度
 * liveImage    飞机活的图像
 * boomImage    飞机爆炸的图像
 * hp   飞机的血量
 * score    飞机的分数
 * dieTimes  飞机死亡后到删除的等待时间，用循环的次数控制
 * speed    飞机的速度
*/



function Plane(posX,posY,sizeWidth,sizeHeight,liveImage,boomImage,hp,score,dieTimes,speed)
{
    var me=this;
    me.posX=posX;//
    me.posY=posY;
    me.sizeWidth=sizeWidth;
    me.sizeHeight=sizeHeight;
    me.boomImage=boomImage;
    me.liveImage=liveImage;
    me.hp=hp;
    me.score=score;
    me.dieTimes=dieTimes;//
    me.speed=speed;
    me.dieTime=0;//-----------------当飞机死亡后，dieTime开始增加，如果dieTime==dieTimes 删除飞机-----------
    me.isDead=false;
    me.imageNode=null;
    me.init();
}

Plane.prototype.init=function()
{
  var me=this;
  me.imageNode=$("<img/>");//加入一个图像
  me.imageNode.css({"top":(me.posY-me.sizeHeight/2)+"px","left":(me.posX-me.sizeWidth/2)+"px"});//定位，逻辑用飞机中心地位，实际要用图片左上角定位
  me.imageNode.attr("src",me.liveImage);//设置图片源
  MAIN_SCENE_DIV.append(me.imageNode);//加入图片
};

Plane.prototype.move=function(scores)
{
  var me=this;
  if(scores<=50000)//对于不同的分数段，敌机的速度不同，难度区间
  {
      me.posY+=me.speed;
  }
  else if(scores<=100000)
  {
      me.posY+=me.speed+1;
  }
  else if(scores<=200000)
  {
      me.posY+=me.speed+2;
  }
  else if(scores<=300000)
  {
      me.posY+=me.speed+3;
  }
  else if(scores<=500000)
  {
     me.posY+=me.speed+4;
  }
  else 
  {
      me.posY+=me.speed+5;
  }
  
  me.imageNode.css({"top": (me.posY - me.sizeHeight / 2) + "px", "left": (me.posX - me.sizeWidth / 2) + "px"});
    
    
};







