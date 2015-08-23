
/*
 * 子弹类
 */

var bulletSizeWidth=6;
var bulletSizeHeight=14;
var bulletImageSrc="Image/bullet.png";

function Bullet(posX,posY,sizeWidth,sizeHeight,liveImage)
{
    var me=this;
    me.posX=posX;
    me.posY=posY;
    me.sizeWidth=sizeWidth;
    me.sizeHeight=sizeHeight;
    me.liveImage=liveImage;
    me.imageNode=null;
    me.attack=1;
    
    
    me.init();
}

Bullet.prototype.init = function()
{
    var me = this;
    me.imageNode = $("<img/>");//加入一个图像
    me.imageNode.css({"top": (me.posY - me.sizeHeight / 2) + "px", "left": (me.posX - me.sizeWidth / 2) + "px"});//定位，逻辑用子弹中心地位，实际要用图片左上角定位
    me.imageNode.attr("src", me.liveImage);//设置图片源
    MAIN_SCENE_DIV.append(me.imageNode);//加入图片
};

Bullet.prototype.move=function()
{
  var me=this;
  
  me.posY-=10;
  me.imageNode.css({"top": (me.posY - me.sizeHeight / 2) + "px", "left": (me.posX - me.sizeWidth / 2) + "px"});
    
    
};



function createBullet(posX,posY)//创建子弹的辅助函数
{
    return new Bullet(posX,posY,bulletSizeWidth,bulletSizeHeight,bulletImageSrc);
}