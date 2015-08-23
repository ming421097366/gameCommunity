
var COLS=16;//地图列数
var ROWS=8;//地图行数
var SPAN=2;//预留边框
var MAP;//地图
var TYPES=18;//图案类型
var isFirst=true;//是否是第一个点
var firstPoint={row:"NULL",col:"NULL",value:"NULL"};
var secondPoint={row:"NULL",col:"NULL",value:"NULL"};
var IMAGE_SIZE=60;//div大小

$(document).ready(onLoad);


function level(num)
{
    switch (num)
    {
        case 0:
            COLS=8;
            ROWS=6;
            init();
            break;
        case 1:
            COLS=12;
            ROWS=8;
            init();
            break;
        case 2:
            COLS=16;
            ROWS=8;
            init();
            break;
            
    }
}


function onLoad()
{
    init();
    $("#boardDivID").mouseup(onMouseUp);
    $("#start").click(init);
}

function onMouseUp(e)
{
    var clickedObject=$(e.target);
    var id=clickedObject.attr("id");//获得被点击的div的id,相对于处理pageX，pageY这是一个更好的做法    
    var row=parseInt(id.substring(1,id.indexOf('_')));//获得通过id传递的行列号
    var col=parseInt(id.substring(id.indexOf('_')+1));
//    alert(row+" ,,"+col);
   if(MAP[row][col]!=0)
   {
        if (isFirst)
        {
            firstPoint = {"row": row, "col": col, "value": MAP[row][col]};//记录第一个点
            clickedObject.css({border:"2px solid red"});//添加选择状态
            $("#b" + secondPoint.row + "_" + secondPoint.col).css({border:"1px solid #888"});//移除第二个点的选中状态
            isFirst = false;//标记为选择第二个点

        }
        else
        {
            if(row==firstPoint.row&&col==firstPoint.col)
            {
                return;
            }
            
            secondPoint = {"row": row, "col": col,"value":MAP[row][col]};//记录第二个点
            clickedObject.css({border:"2px solid red"});//添加选择状态
            $("#b"+firstPoint.row+"_"+firstPoint.col).css({border:"1px solid #888"});//移除第一个点的选中状态
            if (firstPoint.value==secondPoint.value&&hasLine(firstPoint, secondPoint))//如果可以消除消除它
            {
                //alert("ok");
//                if(!hasNext())
//                {
//                    alert("死局或结束，请重新开始");
//                }
                if(isEnd())
                {
                    alert("恭喜你！！！");
                }
            }
            isFirst = true;//标记为选择第一个点
            
        }
       
   }
    
}

function deleteImage(row1,col1,row2,col2)
{
        
         $("#b"+row1+"_"+col1).removeClass("num"+MAP[row1][col1]).addClass("num0");
         MAP[row1][col1]=0;
         $("#b"+row2+"_"+col2).removeClass("num"+MAP[row2][col2]).addClass("num0");
        
        MAP[row2][col2]=0;
}


function hasLine()
{
    var row1=firstPoint.row;
    var row2=secondPoint.row;
    var col1=firstPoint.col;
    var col2=secondPoint.col;
    if(directConnect(row1,col1,row2,col2))//直接相连
    {
        console.log(1);
        deleteImage(row1,col1,row2,col2);
        
        return true;
        
    }
    else if(oneSideConnect(row1,col1,row2,col2))//一个转角相连
    {
        console.log(2);
       deleteImage(row1,col1,row2,col2);
        
        return true;
       
    }
    else if(twoSidesConnect(row1,col1,row2,col2))//两个转角相连
    {
        console.log(3);
        deleteImage(row1,col1,row2,col2);
        
        return true;
    }
    
    
    
}


function twoSidesConnect(row1,col1,row2,col2)
{

    
    for(var i=0;i<=ROWS+1;i++)
    {
        if(MAP[i][col1]==0&&directConnect(row1,col1,i,col1))
        {
            if(oneSideConnect(i,col1,row2,col2))
            {
                return true;
            }
        }

    }

    for(var i=0;i<=COLS+1;i++)
    {
        if(MAP[row1][i]==0&&directConnect(row1,col1,row1,i))
        {
            if(oneSideConnect(row1,i,row2,col2))
            {
                return true;
            }
        }

    }
    return false;
    
    
    
    
}

function oneSideConnect(row1,col1,row2,col2)
{
    var row3=row1;
    var col3=col2;
    var row4=row2;
    var col4=col1;
    if(directConnect(row1,col1,row3,col3)&&directConnect(row3,col3,row2,col2)&&MAP[row3][col3]==0)
    {
        return true;
    }
    else if(directConnect(row1,col1,row4,col4)&&directConnect(row2,col2,row4,col4&&MAP[row4][col4]==0))
    {
        return true;
    }
    else
    {
        return false;
    }
        
    
    
}

function isEnd()
{
    for(var i=1;i<=ROWS;i++)
    {
        for(var j=1;j<=COLS;j++)
        {
            if(MAP[i][j]!=0)
            {
                return false;
            }
        }
    }
    return true;
}

function directConnect(row1,col1,row2,col2)
{
  
  if(col1==col2)//同一列
  {
      if(row1>row2)
      {
          var tmp=row1;
          row1=row2;
          row2=tmp;
      }
        for (var i = row1 + 1; i <= row2-1; i++)
        {
            if (MAP[i][col1] != 0)
            {
                return false;
            }
        }
        return true;
  }
    else if (row1 == row2)//同一行
    {
        if (col1 > col2)
        {
            var tmp = col1;
            col1 = col2;
            col2 = tmp;
        }
        for (var i = col1 + 1; i <= col2 - 1; i++)
        {
            if (MAP[row1][i] != 0)
            {
                return false;
            }
        }
        return true;


    }
    else//既不同列也不同行 false
    {
        return false;
    }
        
   
  
  
  
  
}

function init()
{
    MAP=[];
    for(var i=0;i!=ROWS+SPAN;i++)
    {
        MAP[i]=[];
        for(var j=0;j!=COLS+SPAN;j++)
        {
            MAP[i][j]=0;
        }
    }
    //产生两两匹配的随机位置
    
    initPos();
    
    var blockHtml='';
    for(var i=0;i<ROWS+SPAN;i++)
    {
        for(var j=0;j<COLS+SPAN;j++)
        {
            
            /*
             * 方块默认大小 
             * id格式 brow_col ex:b0_1 b0_2 ...
             * 
             */
            var num=MAP[i][j];
            blockHtml+='<div id="'+'b'+i+'_'+j+'" style="left:'+IMAGE_SIZE*j+'px;top:'+IMAGE_SIZE*i+'px;" class="num'+num+'">'+'</div>';
            //todo 添加图片
            
        }
    }
    
    $("#boardDivID").html(blockHtml).css({width:IMAGE_SIZE*(ROWS+SPAN)+2,height:(COLS+SPAN)*IMAGE_SIZE+2}).show();//背景的高度和宽度根据方块数目决定
    
}


function initPos()
{
//    alert("initPos");
    var listArray=[];
    var total=ROWS*COLS;
    for(var i=0;i!=total;i++)
    {
        listArray[i]=0;
    }
    
    
    for(var i=0;i!=total;i++)
    {
        if (listArray[i] == 0)
        {
            var tmpNum = Math.floor(Math.random() * TYPES) + 1;//得到1，2，3，4  when TYPES=4
            listArray[i] = tmpNum;
            while (true)
            {
                var tmpPos = Math.floor(Math.random() * (total - i)) + i;//得到 i,i+1,...99中的一个数
                
                if (listArray[tmpPos] == 0)
                {   //alert(tmpPos);只能是偶数
                    listArray[tmpPos] = tmpNum;
                    break;
                }
               // alert(i);
            }
        }

    }
    
    var c=0;
    for(var i=1;i<=ROWS;i++)
    {
        for(var j=1;j<=COLS;j++)
        {
            MAP[i][j]=listArray[c];
            
            c++;
            
        }
    }
}

function hasNext()
{
    isHealth=false;
    for(var i=1;i<=ROWS;i++)
    {
        for(var j=1;j<COLS;j++)
        {
            if(MAP[i][j]!=0)
            {
                for (var k = 1; k <= ROWS; k++)
                {
                    for (var m = 1; m < COLS; m++)
                    {
                        if(k==i&&m==j)
                        {
                            continue;
                            
                        }
                        if(MAP[i][j]==MAP[k][m]&&hasLine(i,j,k,m))
                        {
                            isHealth=true;
                            return isHealth;
                        }
                    }
                }
                
            }
        }
    }
    return isHealth;
}







