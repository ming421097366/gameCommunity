
var BOX=
[
	[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],//长条形
	[
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],//T字形
	[
		[0,0,0,0,0],
		[0,1,1,0,0],
		[0,0,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],//z字形
	[
		[0,0,0,0,0],
		[0,0,1,1,0],
		[0,1,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],//倒z字形
	[
		[0,0,0,0,0],
		[0,1,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0]
	],//l字形
	[
		[0,0,0,0,0],
		[0,0,1,1,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0]
	],//倒l字形
	[
		[0,0,0,0,0],
		[0,0,1,1,0],
		[0,0,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	]//正方形
];



/*
 * posX 箱子的位置 左上角
 * posY 箱子的位置
 */
function Box(posX,posY)
{
    var me=this;
    me.posX=posX;
    me.posY=posY;
    me.matrix=[];
    me.init();
    me.size=20;
    
}

Box.prototype.init=function()//初始化箱子的形状
{
    var me=this;
    var k=Math.floor(Math.random()*7);
    matrix=BOX[k];
    for(var i=0;i<5;i++)
    {
        me.matrix[i]=[];
        for(var j=0;j<5;j++)
        {
            me.matrix[i][j]=matrix[i][j];//--------me.matrix=BOX[i]-------不能直接赋值，否则它会变成引用。----
                    
        }
    }
    
    
};



Box.prototype.draw=function()//画一个箱子，根据箱子的位置和箱子的形状
{
    var me=this;
    mainPanel.fillStyle = "rgba(0,0,250,1)";
    mainPanel.strokeStyle = "rgba(0,0,0,1)";
    for(var i=0;i<5;i++)
    {
        for(var j=0;j<5;j++)
        {
            if(me.matrix[i][j]==1)
            {
                posX=j+me.posX;
                posY=i+me.posY;
                mainPanel.fillRect(posX*20,posY*20,me.size,me.size);
                mainPanel.strokeRect(posX*20,posY*20,me.size,me.size);
            }
            
        }
    }

};

Box.prototype.move=function(direction)
{
    var me=this;
    switch (direction)
    {
        case "right":
            me.posX++;
            break;
        case "left":
            me.posX--;
            break;
        case "down":
            me.posY++;
            break;
    }
    
};

Box.prototype.drop=function()
{
    var me=this;
    var posY=me.posY+1;
    if(testNewPosition(me.posX,posY,me.matrix))
    {
        me.move("down");
        return true;
    }
    else
    {
        return false;
    }
};

Box.prototype.rotate=function()
{
    var me=this;
    var boxTmp=new Box(me.posX,me.posY);
    
    for(var i=0;i<5;i++)
    {
        for(var j=0;j<5;j++)
        {
            boxTmp.matrix[j][4-i]=me.matrix[i][j];
        }
    }
    if(testNewPosition(boxTmp.posX,boxTmp.posY,boxTmp.matrix))
    {
        box=boxTmp
    }
    
};