
var MAP;//二维数组
var LAST_BLOCKS;//剩余方块数
var LAST_MINES;//剩余地雷数
var GAME_MODE;//游戏状态 结束0 进行1 初始化完成2
var GAME_END=0;
var GAME_ON=1;
var GAME_WAIT=2;
var ROWS;//行数
var COLS;//列数
var START_TIME;
/*
 * 雷区的行数，列数，和地雷的数目
 * 地图存储在全局变量Map中
 */


$(document).ready(onLoad);

function onLoad()
{
    initialMap(10,10,10);//初始化地图
    $("#mapDivID").mouseup(onMouseUp);//加载鼠标点击函数
    $("#simple").click(function(){initialMap(10,10,10);});
    $("#middle").click(function(){initialMap(16,16,40);});
    $("#hard").click(function(){initialMap(30,16,99);});
}


function onMouseUp(e)
{
    var clickedObject=$(e.target);//获得被点击的div
    var id=clickedObject.attr("id");//获得被点击的div的id,相对于处理pageX，pageY这是一个更好的做法
    
    var row=parseInt(id.substring(1,id.indexOf('_')));//获得通过id传递的行列号
    var col=parseInt(id.substring(id.indexOf('_')+1));
    
   // alert(MAP[row][col]);
    switch (GAME_MODE)
    {
        case GAME_WAIT://游戏刚开始只能打开方块
            if(e.which==1)
            {
                
                openBlock(row,col);
                
                var now=new Date();
                START_TIME=now.getTime();
                timer();
                GAME_MODE=GAME_ON;
                
            }
            break;
        case GAME_ON:
            if(e.which==1)//游戏进行时，可以打开方块，也可以标记方块
            {
                
                if(clickedObject.hasClass("hidden")&&!clickedObject.hasClass("flag"))//只能打开没有打开和没有标记的方块
                {
                    openBlock(row,col);
                }
                else if(!clickedObject.hasClass("hidden"))
                {
                    //强制打开周围所有块
                }
            }
            else if(e.which==3&&clickedObject.hasClass("hidden"))//只能标记没有打开的雷块
            {
                if(clickedObject.hasClass("flag"))//切换标记，去除标记时，把剩余块数目和剩余雷数++
                {
                    clickedObject.removeClass("flag");
                    LAST_BLOCKS++;
                    LAST_MINES++;
                }
                else 
                {
                    clickedObject.addClass("flag");
                    LAST_BLOCKS--;
                    LAST_MINES--;
                }
                $("#lastMines").html(LAST_MINES);
                $("#lastBlocks").html(LAST_BLOCKS);

            }
            if (LAST_BLOCKS == LAST_MINES)//如果剩余块的数目等于雷数，游戏结束，胜利
            {
                endGame(true);
            }
            break;
        case GAME_END:
            break;
    }
    
    $('#mapDivID').bind('contextmenu', function(){ return false; }); //阻止默认的右键单击事件
    
    
    
    
    
}

function openBlock(row,col)
{
    var currentBlock=$("#b"+row+"_"+col);//获得div
    
    var condition=MAP[row][col];//获得雷区情况
    if(condition==-1)//有雷
    {
        if(GAME_MODE==GAME_ON)
        {
            currentBlock.addClass("cbomb");//踩到雷，结束游戏
            endGame(false);
        }
        else if(GAME_MODE==GAME_WAIT)
        {
            initialMap(ROWS,COLS,LAST_MINES);//避免第一次就触雷
            openBlock(row,col);
        }
        else if(GAME_MODE==GAME_END)
        {
            if(!currentBlock.hasClass("flag"))
            {
                currentBlock.addClass("bomb");
            }
        }
        
    }
    else if(condition>0)//无雷，周围有雷
    {
        if(currentBlock.hasClass("flag"))
        {
            currentBlock.addClass("wrong");
            if(GAME_MODE == GAME_ON)
            {
                endGame(false);
            }
            
        }
        else
        {
            currentBlock.html(condition).addClass("num" + condition).removeClass("hidden");
            if (GAME_MODE!=GAME_END)
            {
                LAST_BLOCKS--;
                $("#lastBlocks").html(LAST_BLOCKS);
            }
        }
  
    }
    else if(condition==0)//无雷，周围无雷
    {
        if(currentBlock.hasClass("flag"))
        {
            currentBlock.addClass("wrong");
            if(GAME_MODE==GAME_ON)
            {
                endGame(false);
            }
        }
        else
        {
            currentBlock.removeClass("hidden");
            if(GAME_MODE!=GAME_END)
            {
                LAST_BLOCKS--;
                $("#lastBlocks").html(LAST_BLOCKS);
                if((row-1>=0)&&(col-1>=0)&&($("#b"+(row-1)+"_"+(col-1)).hasClass("hidden")))//搜索左上角
                {
                    openBlock(row-1,col-1);
                }
                if((row-1>=0)&&($("#b"+(row-1)+"_"+col).hasClass("hidden")))//搜索上面
                {
                    openBlock(row-1,col);
                }
                if((row-1>=0)&&(col+1<COLS)&&($("#b"+(row-1)+"_"+(col+1)).hasClass("hidden")))//搜索右上角
                {
                    openBlock(row-1,col+1);
                }
                if((col-1>=0)&&($("#b"+row+"_"+(col-1)).hasClass("hidden")))//搜索左边
                {
                    openBlock(row,col-1);
                }
                if((col+1<COLS)&&($("#b"+row+"_"+(col+1)).hasClass("hidden")))//搜索右边
                {
                    openBlock(row,col+1);
                }
                if((row+1<ROWS)&&(col-1>=0)&&($("#b"+(row+1)+"_"+(col-1)).hasClass("hidden")))//搜索左下角
                {
                    openBlock(row+1,col-1);
                }
                if((row+1<ROWS)&&($("#b"+(row+1)+"_"+col).hasClass("hidden")))//搜索下面
                {
                    openBlock(row+1,col);
                }
                if((row+1<ROWS)&&(col+1<COLS)&&($("#b"+(row+1)+"_"+(col+1)).hasClass("hidden")))//搜索右下角
                {
                    openBlock(row+1,col+1);
                }
                
            }
        }
    }
    
}

function endGame(isWin)
{
    GAME_MODE=GAME_END;
    for(var i=0;i<ROWS;i++)
    {
        for(var j=0;j<COLS;j++)
        {
            if(isWin)
            {
                
            }
            else
            {
                
                openBlock(i,j);
            }
        }
    }
    alert(isWin?"you are win":"you are failed");
}

function initialMap(rows,cols,mines)
{
    LAST_BLOCKS=rows*cols;
    LAST_MINES=mines;
    GAME_MODE=2;
    ROWS=rows;
    COLS=cols;
    
    MAP=[];
    for(var i=0;i<rows;i++)//初始化
    {
        MAP[i]=[];
        for(var j=0;j<cols;j++)
        {
            MAP[i][j]=0;
        }
    }
    
    var tempMines=mines;
    
    while(tempMines>0)//布雷
    {
        var mineRow=Math.floor(Math.random()*(rows-1));
        var mineCol=Math.floor(Math.random()*(cols-1));
        if(MAP[mineRow][mineCol]!=-1)
        {
            MAP[mineRow][mineCol]=-1;
            tempMines--;
        }
        
    }
    
    for(var i=0;i<rows;i++)
    {
        for(var j=0;j<cols;j++)
        {
            if(MAP[i][j]!=-1)//对于非雷区域，记录它周围的雷数
            {
                if((i-1>=0)&&(j-1>=0)&&(MAP[i-1][j-1]==-1))//搜索左上角
                {
                    MAP[i][j]++;
                }
                if((i-1>=0)&&(MAP[i-1][j]==-1))//搜索上面
                {
                    MAP[i][j]++;
                }
                if((i-1>=0)&&(j+1<cols)&&(MAP[i-1][j+1]==-1))//搜索右上角
                {
                    MAP[i][j]++;
                }
                if((j-1>=0)&&(MAP[i][j-1]==-1))//搜索左边
                {
                    MAP[i][j]++;
                }
                if((j+1<cols)&&(MAP[i][j+1]==-1))//搜索右边
                {
                    MAP[i][j]++;
                }
                if((i+1<rows)&&(j-1>=0)&&(MAP[i+1][j-1]==-1))//搜索左下角
                {
                    MAP[i][j]++;
                }
                if((i+1<rows)&&(MAP[i+1][j]==-1))//搜索下面
                {
                    MAP[i][j]++;
                }
                if((i+1<rows)&&(j+1<cols)&&(MAP[i+1][j+1]==-1))//搜索右下角
                {
                    MAP[i][j]++;
                }
                
                
            }
        }
    }
    
    var blockHtml='';
    for(var i=0;i<rows;i++)
    {
        for(var j=0;j<cols;j++)
        {
            
            /*
             * 方块默认大小 19X19
             * id格式 brow_col ex:b0_1 b0_2 ...
             * //背景的高度和宽度根据方块数目决定
             */
            
            blockHtml+='<div id="'+'b'+i+'_'+j+'" style="left:'+20*j+'px;top:'+20*i+'px;"class="hidden"></div>';
            
        }
    }
    
    $("#mapDivID").html(blockHtml).css({width:20*cols+2,height:rows*20+2}).show();
    $("#lastMines").html(LAST_MINES);
    $("#lastBlocks").html(LAST_BLOCKS);
    $("#time").html("0");

    
    
    
}

function timer()
{
    if(GAME_MODE!=GAME_END)
    {
        var now=new Date().getTime();
        $("#time").html(Math.ceil((now-START_TIME)/1000));
        setTimeout(function(){timer();},500);
        
        
        
    }
    else
    {
        $("#time").html("0");
    }
}

