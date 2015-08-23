





/*
 * posX 节点左上角X
 * posY 节点左上角Y
 */



function SnakeNode(posX,posY,size)
{
    var me=this;
    me.posX=posX;
    me.posY=posY;
    me.size=20;
    
}

SnakeNode.prototype.draw=function()
{
    
    var me=this;
    mainPanel.fillStyle = "rgba(0,250,0,1)";
    mainPanel.fillRect(me.posX*20,me.posY*20,me.size,me.size);
    mainPanel.strokeStyle = "rgba(0,0,0,1)";
    mainPanel.strokeRect(me.posX*20,me.posY*20,me.size,me.size);
    
    
    
};
//SnakeNode.prototype.clear=function()
//{
//    var me=this;
//     mainPanel.clearRect(me.posX*20-1,me.posY*20-1,me.size+2,me.size+2);
//};
