


function Map(rows,cols)
{
    var me=this;
    me.matrix=[];
    me.rows=rows;
    me.cols=cols;
    me.size=20;
    me.init();
}

Map.prototype.init=function()
{
    var me=this;
    for(var i=0;i<me.rows;i++)
    {
        me.matrix[i]=[];
        for(var j=0;j<me.cols;j++)
        {
            if (j < 2 || j >me.cols-3 || i > me.rows-3)
            {
                me.matrix[i][j] = 1;
            }
            else
            {
                me.matrix[i][j] = 0;
            }
        }
    }
    
};

Map.prototype.draw=function()//画地图
{
    var me=this;
    mainPanel.fillStyle = "rgba(0,0,250,1)";
    mainPanel.strokeStyle = "rgba(0,0,0,1)";
    for(var i=0;i<me.rows-1;i++)
    {
        for(var j=1;j<me.cols-1;j++)
        {
            if(me.matrix[i][j]==1)
            {
                posX=j;
                posY=i;
                mainPanel.fillRect(posX*20,posY*20,me.size,me.size);
                mainPanel.strokeRect(posX*20,posY*20,me.size,me.size);
            }
            
        }
    }

    
};

Map.prototype.putBoxToMap=function()
{
    var me=this;
	for (var i=0;i<5;i++)
	{
		for (var j=0;j<5;j++)
		{
			if (box.matrix[i][j]==1)
			{
				me.matrix[box.posY+i][box.posX+j]=box.matrix[i][j];
			}
		}
	}

};

function testNewPosition(posX,posY,matrix)
{
    
    
    for (var i = 0; i < 5; i++)
    {
        for (var j = 0; j < 5; j++)
        {
            if (map.matrix[posY + i][posX + j] && matrix[i][j])
            {
                return false;
            }

        }
    }
    return true;
};


Map.prototype.cleanFull = function()
{
    var me = this;

    var i = 0;
    var j = 0;
    var full_flag = 1;
    for (i = 0; i < me.rows - 2; i++)
    {
        full_flag = 1;
        for (j = 2; j < me.cols - 2; j++)
        {
            if (!me.matrix[i][j])
            {
                full_flag = 0;
                break;
            }
        }
        if (full_flag)
        {
            for (var di = i - 1; di >= 0; di--)//将要清除的行上的所有行往下移动一行
            {
                for (var dj = 2; dj < me.cols - 2; dj++)
                {
                    me.matrix[di + 1][dj] = me.matrix[di][dj];
                }
            }
        }

    }


};



