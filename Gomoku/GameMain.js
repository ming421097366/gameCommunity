/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var canvas;
var context;
var chessArray;//棋盘逻辑数组
var isBlack;//是否轮到黑棋下
var imageWhite=new Image();
var imageBlack=new Image();
var margin;
var isEnd;
var userTouser=false;
function onLoad()
{
    init();
    canvas.addEventListener('click',onMouseClick);
    $("#humanTohuman").click(turnHuman);
    $("#hunmanToComputer").click(turnComputer);

}
$(document).ready(onLoad);


function turnHuman()
{
    userTouser=true;
    init();
}
function turnComputer()
{
    userTouser=false;
    init();
}

function init()
{
    canvas=document.getElementById("canvasID");//用$不行？？
    context=canvas.getContext("2d");
    isEnd=false;
    //userTouser=false;
    //确定margin
    margin=10;
    
    //初始化棋子
    
    imageBlack.src="image/chessBlack.png";
    imageWhite.src="image/chessWhite.png";
    
    
    //黑棋先手
    isBlack=true;
    
    //初始化逻辑数组
    chessArray=new Array(15);
    for(var i=0;i!==15;i++)
    {
        chessArray[i]=new Array(15);
        for(var j=0;j!==15;j++)
        {
            chessArray[i][j]=0;
        }
    }
    context.clearRect(0,0,640,640);//清空图副
    drawBoard();    //画棋盘
}

function drawBoard()
{
    
    for(var i=20;i<=600;i+=40)//原点在左上角
    {
        
        
        context.strokeStyle = 'rgba(0,0,0,1)'; 
        context.beginPath();//画横线
        
        context.moveTo(0,i);
        context.lineTo(600,i);
        
        context.moveTo(i,0);//画竖线
        context.lineTo(i,600);
        
        context.stroke();
        
        context.closePath();
  
    }
    for(var i=20;i<=600;i+=40)
    {
        for(var j=20;j<=600;j+=40)
        {
            if(i==300&&j==300)
            {
                context.beginPath();
                context.arc(i, j, 4, 0, 360, false);
                context.fillStyle = 'rgba(10,10,10,1)';//填充颜色,默认是黑色
                context.fill();//画实心圆
                context.closePath();
            }
            else
            {
                context.beginPath();
                context.arc(i, j, 3, 0, 360, false);
                context.fillStyle = 'rgba(50,50,50,0.8)';//填充颜色,默认是黑色
                context.fill();//画实心圆
                context.closePath();
        
            }
        }

    }
    


}

function test()
{
    alert(1);
}

function onMouseClick(e)
{
    //alert(e.clientX+" ,"+e.clientY);

    
    //获得鼠标点击的位置
    var row=parseInt((e.clientY-margin)/40);
    var col=parseInt((e.clientX-margin-350)/40);//js的“/”不会取整
//    alert(row+" ,"+col);
    //判断这个位置是否可以下
    if(chessArray[row][col]!==0)
    {
        alert("这个位置不可以下");
    }
    else
    {
        
        if(userTouser)
        {
            if (isBlack)    //判断是下黑棋还是白棋
            {
                //下黑棋
                playChess(1, row, col);
                isBlack = !isBlack;


            }
            else
            {
                //下白棋
                playChess(2, row, col);
                isBlack = !isBlack;

            }
        }
        else//人机对战
        {
            if(isBlack)
            {
                playChess(1, row, col);//默认人下黑棋
                var AIpos=getAIPos(2);
                playChess(2,AIpos.row,AIpos.col);//机器下白棋
                
            }
            
        }
        
        
        
        //AI work at here.
//        var AIPos=getAIPos();
//        playChess()
        
    }

}


function playChess(chessColor,row,col)//chessColor 黑棋为1 白棋为2
{
    if(isEnd)
    {
        if(confirm("是否重新"))
        {
            
            init();
            //--------todo debug一下，白棋先，黑棋先?-------
            
        }
        else
        {
            alert("游戏结束");
        }
        return;
    }
    if (row >= 0 && row < 15 && col >= 0 && col < 15)
    {
        if (chessColor ===1)
        {
            //画黑棋
            context.drawImage(imageBlack,col*40,row*40);//画图的坐标是相对于canvas所以不需要加margin
            chessArray[row][col] = 1;
        }
        else
        {
            //画白棋
            context.drawImage(imageWhite,col*40,row*40);
            chessArray[row][col] = 2;
        }
        
        //判断游戏是否结束
        judgeChess(chessColor,row,col);

    }
    
    
}

function judgeChess(chessColor,row,col)
{
    var count1=searchWestToEastSum(chessColor,row,col);
    var count2=searchNorthToSouthSum(chessColor,row,col);
    var count3=searchSouthWestToNorthEast(chessColor,row,col);
    var count4=searchNorthWestToSouthEast(chessColor,row,col);
    
    if(count1>=5||count2>=5||count3>=5||count4>=5)
    {
        if(chessColor===1)
        {
            alert("黑棋胜");
        }
        else
        {
            alert("白棋胜");
        }
        isEnd=true;
    }
}

function searchWest(chessColor,row,col)//搜索（r,c）位置西边有几连珠
{
    var west=0;
    for (var i = 1; i < 5; i++)
    {
        if ((col-i>=0)&&chessArray[row][col-i] == chessColor)
        {
            west++;
        }
        else
        {
            break;
        }
    }
    return west;
}

function searchEast(chessColor,row,col)//搜索（r,c）位置东边有几连珠
{
    var east=0;
    for (var i = 1; i < 5; i++)
    {
        if ((col+i<15)&&chessArray[row][col+i] == chessColor)
        {
            east++;
        }
        else
        {
            break;
        }
    }
    return east;
}

function searchWestToEastSum(chessColor,row,col)
{
    var west=searchWest(chessColor,row,col);
    var east=searchEast(chessColor,row,col);
    return west+east+1;
}

function searchNorth(chessColor,row,col)//搜索（r,c）位置北边有几连珠
{
    var north=0;
    for (var i = 1; i < 5; i++)
    {
        if ((row-i>=0)&&chessArray[row-i][col] == chessColor)
        {
            north++;
        }
        else
        {
            break;
        }
    }
    return north;
}


function searchSouth(chessColor,row,col)//搜索（r,c）位置南边有几连珠
{
    var south=0;
    for (var i = 1; i < 5; i++)
    {
        if ((row+i<15)&&chessArray[row+i][col] == chessColor)
        {
            south++;
        }
        else
        {
            break;
        }
    }
    return south;
}

function searchNorthToSouthSum(chessColor,row,col)
{
    var south=searchSouth(chessColor,row,col);
    var north=searchNorth(chessColor,row,col);
    return south+north+1;
}

function searchSouthWest(chessColor,row,col)//搜索（r,c）位置西南有几连珠
{
    var southWest=0;
    for (var i = 1; i < 5; i++)
    {
        if ((row+i<15)&&(col-i>=0)&&chessArray[row+i][col-i] == chessColor)
        {
            southWest++;
        }
        else
        {
            break;
        }
    }
    return southWest;
}
function searchNorthEast(chessColor,row,col)//搜索（r,c）位置东北有几连珠
{
    var northEast=0;
    for (var i = 1; i < 5; i++)
    {
        if ((row-i>=0)&&(col+i<15)&&chessArray[row-i][col+i] == chessColor)
        {
            northEast++;
        }
        else
        {
            break;
        }
    }
    return northEast;
}

function searchSouthWestToNorthEast(chessColor,row,col)
{
    var southWest=searchSouthWest(chessColor,row,col);
    var northEast=searchNorthEast(chessColor,row,col);
    return southWest+northEast+1;
    
}

function searchNorthWest(chessColor,row,col)//搜索（r,c）位置西北有几连珠
{
    var northWest=0;
    for (var i = 1; i < 5; i++)
    {
        if ((row-i>=0)&&(col-i>=0)&&chessArray[row-i][col-i] == chessColor)
        {
            northWest++;
        }
        else
        {
            break;
        }
    }
    return northWest;
}

function searchSouthEast(chessColor,row,col)//搜索（r,c）位置东南有几连珠
{
    var southEast=0;
    for (var i = 1; i < 5; i++)
    {
        if ((row+i<15)&&(col+i<15)&&chessArray[row+i][col+i] == chessColor)
        {
            southEast++;
        }
        else
        {
            break;
        }
    }
    return southEast;
}


function searchNorthWestToSouthEast(chessColor,row,col)
{
    var northWest=searchNorthWest(chessColor,row,col);
    var southEast=searchSouthEast(chessColor,row,col);
    return northWest+southEast+1;
}


